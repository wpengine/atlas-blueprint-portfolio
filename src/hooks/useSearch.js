import { useRouter } from 'next/router';
import { getFields, getArrayFields } from 'gqty';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { client } from 'client';
import { uniqBy } from './usePagination';

export default function useSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);
  const [searchResults, setSearchResults] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchResults(searchQuery, endCursor = undefined) {
    setIsLoading(true);
    const data = await client.client.resolved(() => {
      const { nodes, pageInfo } = client.client.query.contentNodes({
        first: 5,
        after: endCursor,
        where: { search: searchQuery },
      });

      return {
        nodes: getArrayFields(nodes),
        pageInfo: getFields(pageInfo),
      };
    });

    setIsLoading(false);

    return data;
  }

  const fetchInitialResults = useCallback(async () => {
    clearResults();

    const res = await fetchResults(debouncedSearchQuery);

    setSearchResults(res?.nodes);
    setPageInfo(res?.pageInfo);
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
    if (router.isReady && router.query.q) {
      setSearchQuery(router.query.q);
    }
  }, [router.isReady, router.query.q]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (debouncedSearchQuery === '') {
      clearResults();

      return;
    }

    fetchInitialResults(debouncedSearchQuery);
  }, [debouncedSearchQuery, fetchInitialResults]);

  return { searchQuery, setSearchQuery, searchResults, loadMore, isLoading };
}
