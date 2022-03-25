import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import {
  Button,
  Footer,
  Header,
  Main,
  SearchInput,
  SearchRecommendations,
  SearchResults,
  SEO,
} from 'components';
import useSearch from 'hooks/useSearch';
import React from 'react';
import styles from 'styles/pages/_Search.module.scss';
import { pageTitle } from 'utils';

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
    error,
  } = useSearch();

  return (
    <>
      <SEO title={pageTitle(generalSettings, 'Search')} />

      <Header />

      <Main>
        <div className={styles['search-header-pane']}>
          <div className="container small">
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
        <div className="container small">
          {error && (
            <div className="alert-error">
              An error has occurred. Please refresh and try again.
            </div>
          )}

          <SearchResults searchResults={searchResults} isLoading={isLoading} />

          {pageInfo?.hasNextPage && (
            <div className={styles['load-more']}>
              <Button onClick={() => loadMore()}>Load more</Button>
            </div>
          )}

          {!isLoading && searchResults === null && <SearchRecommendations />}
        </div>
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
