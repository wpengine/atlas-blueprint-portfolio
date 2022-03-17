import React from 'react';
import Head from 'next/head';
import { client } from 'client';
import appConfig from '../app.config';
import { Footer, Header, LoadMore, Main, Projects } from 'components';
import { getNextStaticProps } from '@faustjs/next';
import SearchInput from 'components/SearchInput/SearchInput';
import useSearch from 'hooks/useSearch';
import SearchResults from 'components/SearchResults/SearchResults';
import SearchRecommendations from 'components/SearchRecommendations/SearchRecommendations';
import Button from 'components/Button/Button';
import styles from 'styles/pages/_Search.module.scss';

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

  return (
    <>
      <Head>
        <title>Search - {generalSettings?.description}</title>
      </Head>

      <Header className={styles['search-header']} />

      <div className={styles['search-header-pane']}>
        <div className="container-small">
          <h2 className={styles['search-header-text']}>
            {searchQuery && !isLoading
              ? `Showing results for "${searchQuery}"`
              : `Search`}
          </h2>
          <SearchInput
            value={searchQuery}
            onChange={(newValue) => setSearchQuery(newValue)}
          />
        </div>
      </div>

      <Main className="container-small">
        <>
          <SearchResults searchResults={searchResults} isLoading={isLoading} />

          {searchResults?.length > 0 && pageInfo?.hasNextPage && (
            <div className={styles['load-more']}>
              <Button onClick={() => loadMore()}>Load more</Button>
            </div>
          )}

          {!isLoading && searchResults === null && <SearchRecommendations />}
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
