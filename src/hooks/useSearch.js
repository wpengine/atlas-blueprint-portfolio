import appConfig from 'app.config';
import { client } from 'client';
import { getArrayFields, getFields, prepass } from 'gqty';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { uniqBy } from 'utils';
import { useRouter } from 'next/router';

const searchInputDebounceMs = 500;

/**
 * useSearch hook enables a user to perform search functionality from their WordPress site
 * with proper debouncing of the search input, and pagination via the `loadMore` function.
 *
 * @returns {{searchQuery: string, setSearchQuery: (newValue) => void, searchResults: object[] | null, loadMore: () => void, isLoading: boolean, pageInfo: object;}} Result object
 */
export default function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(
    searchQuery,
    searchInputDebounceMs
  );
  const [searchResults, setSearchResults] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  /**
   * Fetch results based on the search query and cursor if we are paginating.
   * @param {string} searchQuery The user inputted search query
   * @param {string | undefined} endCursor The end cursor if we are paginating
   * @returns
   */
  const fetchResults = useCallback(
    async (searchQuery, endCursor = undefined) => {
      try {
        /**
         * Do a prepass request for the search result metadata so we can make a
         * proper subsequent request for the title and content based on the content
         * type.
         *
         * typically this can be done with the ... on NodeWithTitle interface, but there is
         * currently a bug.
         *
         * @see https://gqty.dev/docs/client/helper-functions#prepass
         * @see https://github.com/gqty-dev/gqty/issues/733
         */
        const metadata = await client.client.resolved(() => {
          const { nodes, pageInfo } = client.client.query.contentNodes({
            first: appConfig?.postsPerPage,
            after: endCursor,
            where: { search: searchQuery },
          });

          /**
           * Explicitly define the fields we want GQty to return in this query, as
           * we have to make a subsequent request for the title and content.
           *
           * @see https://gqty.dev/docs/client/helper-functions#prepass
           */
          prepass(nodes, 'databaseId', 'id', 'uri', 'date', '__typename');

          return { nodes, pageInfo };
        });

        /**
         * Make a prepass request for the title and excerpt from the previously
         * fetched metadata.
         */
        const metadataWithContent = await client.client.resolved(() => {
          metadata?.nodes?.map((node) =>
            prepass(
              node,
              `$on.${node?.__typename}.title`,
              `$on.${node?.__typename}.excerpt`
            )
          );

          return {
            nodes: getArrayFields(
              metadata?.nodes,
              'databaseId',
              'id',
              'uri',
              'date',
              '__typename',
              '$on'
            ),
            pageInfo: getFields(metadata?.pageInfo),
          };
        });

        return metadataWithContent;
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.log(error);
        }

        setError(error);
        clearResults();

        return;
      }
    },
    []
  );

  /**
   * Fetch initial results. This can happen either upon first search. Or after
   * a search query has been deleted and the user types a new search query.
   */
  const fetchInitialResults = useCallback(async () => {
    setIsLoading(true);

    clearResults();

    const res = await fetchResults(debouncedSearchQuery);

    setSearchResults(res?.nodes);
    setPageInfo(res?.pageInfo);

    setIsLoading(false);
  }, [debouncedSearchQuery, fetchResults]);

  function clearResults() {
    setSearchResults(null);
    setPageInfo(null);
  }

  /**
   * Load more search results via the pageInfo `endCursor` and `hasNextPage`
   */
  async function loadMore() {
    if (!pageInfo?.hasNextPage || !pageInfo?.endCursor) {
      return;
    }

    setIsLoading(true);

    const res = await fetchResults(debouncedSearchQuery, pageInfo?.endCursor);

    setSearchResults((prev) => uniqBy([...prev, ...res.nodes], (v) => v.id));
    setPageInfo(res?.pageInfo);

    setIsLoading(false);
  }

  /**
   * Populate the search input with the searchQuery url param if it exists.
   */
  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.searchQuery) {
      setSearchQuery(router.query.searchQuery);
    }
  }, [router]);

  /**
   * Upon user input, display the loading screen for perceived performance,
   * even though we will not start fetching data until the debounce timeout.
   */
  useEffect(() => {
    if (searchQuery !== '' && searchResults === null) {
      setIsLoading(true);
    }
  }, [searchQuery, searchResults]);

  /**
   * When the search query input has been cleared, clear the results.
   */
  useEffect(() => {
    if (searchQuery === '') {
      clearResults();
    }
  }, [searchQuery]);

  /**
   * Fetch the initial results once the user has entered a search query and
   * the debounce timeout has been reached.
   */
  useEffect(() => {
    if (debouncedSearchQuery === '') {
      clearResults();

      return;
    }

    fetchInitialResults(debouncedSearchQuery);
  }, [debouncedSearchQuery, fetchInitialResults]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    loadMore,
    isLoading,
    pageInfo,
    error,
  };
}
