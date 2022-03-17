import { useRouter } from 'next/router';
import { getFields, getArrayFields, prepass, selectFields } from 'gqty';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { client } from 'client';
import { uniqBy } from './usePagination';

export default function useSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [searchResults, setSearchResults] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchResults(searchQuery, endCursor = undefined) {
    const data = await client.client.resolved(() => {
      const { nodes, pageInfo } = client.client.query.contentNodes({
        first: 5,
        after: endCursor,
        where: { search: searchQuery },
      });

      prepass(nodes, 'databaseId', 'id', 'uri', 'date', '__typename');

      return { nodes, pageInfo };
    });

    const dataWithTitle = await client.client.resolved(() => {
      data?.nodes?.map((node) =>
        prepass(node, `$on.${node?.__typename}.title`)
      );

      return {
        nodes: getArrayFields(
          data?.nodes,
          'databaseId',
          'id',
          'uri',
          'date',
          '__typename',
          '$on'
        ),
        pageInfo: getFields(data?.pageInfo),
      };
    });

    return dataWithTitle;
  }

  const fetchInitialResults = useCallback(async () => {
    clearResults();
    setIsLoading(true);

    const res = await fetchResults(debouncedSearchQuery);

    setSearchResults(res?.nodes);
    setPageInfo(res?.pageInfo);

    setIsLoading(false);
  }, [debouncedSearchQuery]);

  function clearResults() {
    setSearchResults(null);
  }

  async function loadMore() {
    if (!pageInfo?.hasNextPage || !pageInfo?.endCursor) {
      return;
    }

    const res = await fetchResults(debouncedSearchQuery, pageInfo?.endCursor);

    setSearchResults((prev) => uniqBy([...prev, ...res?.nodes], (v) => v.id));
    setPageInfo(res?.pageInfo);
  }

  useEffect(() => {
    if (searchQuery !== '' && searchResults === null) {
      setIsLoading(true);
    }
  }, [searchQuery, searchResults]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (debouncedSearchQuery === '') {
      clearResults();

      return;
    }

    fetchInitialResults(debouncedSearchQuery);
  }, [router.isReady, debouncedSearchQuery, fetchInitialResults]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    loadMore,
    isLoading,
    pageInfo,
  };
}
