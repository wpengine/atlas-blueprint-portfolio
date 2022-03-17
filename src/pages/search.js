import React from 'react';
import Head from 'next/head';
import { client } from 'client';
import appConfig from '../app.config';
import { Footer, Header, LoadMore, Main, Projects } from 'components';
import { getNextStaticProps } from '@faustjs/next';
import SearchInput from 'components/SearchInput/SearchInput';
import useSearch from 'hooks/useSearch';
import SearchResults from 'components/SearchResults/SearchResults';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    loadMore,
    isLoading,
    pageInfo,
  } = useSearch();

  console.log('isLoading', isLoading);
  return (
    <>
      <Head>
        <title>Search - {generalSettings?.description}</title>
      </Head>

      <Header
        title={
          searchQuery && searchResults?.length
            ? `Showing ${searchResults.length} results for "${searchQuery}"`
            : `Search`
        }
      />

      <Main className="container-small">
        <>
          <SearchInput
            value={searchQuery}
            onChange={(newValue) => setSearchQuery(newValue)}
          />

          <SearchResults searchResults={searchResults} isLoading={isLoading} />

          {searchResults?.length > 0 && pageInfo?.hasNextPage && (
            <button onClick={() => loadMore()}>Load more</button>
          )}
        </>
      </Main>

      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
