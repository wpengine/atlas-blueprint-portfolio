import * as MENUS from 'constants/menus';

import { gql, useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import {
  Button,
  Header,
  Main,
  NavigationMenu,
  SearchInput,
  SearchResults,
  SEO,
  SearchRecommendations,
} from 'components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { useState } from 'react';
import { GetSearchResults } from 'queries/GetSearchResults';
import styles from 'styles/pages/_Search.module.scss';
import appConfig from 'app.config';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: pageData } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    pageData.generalSettings;
  const primaryMenu = pageData.headerMenuItems.nodes ?? [];
  const categories = pageData.categories.nodes;

  const {
    data: searchResultsData,
    loading: searchResultsLoading,
    error: searchResultsError,
    fetchMore: fetchMoreSearchResults,
  } = useQuery(GetSearchResults, {
    variables: {
      first: appConfig.postsPerPage,
      after: '',
      search: searchQuery,
    },
    skip: searchQuery === '',
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />

      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />

      <Main>
        <div className={styles['search-header-pane']}>
          <div className="container small">
            <h2 className={styles['search-header-text']}>
              {searchQuery && !searchResultsLoading
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
          {searchResultsError && (
            <div className="alert-error">
              An error has occurred. Please refresh and try again.
            </div>
          )}

          <SearchResults
            searchResults={searchResultsData?.contentNodes?.edges?.map(
              ({ node }) => node
            )}
            isLoading={searchResultsLoading}
          />

          {searchResultsData?.contentNodes?.pageInfo?.hasNextPage && (
            <div className={styles['load-more']}>
              <Button
                onClick={() => {
                  fetchMoreSearchResults({
                    variables: {
                      after:
                        searchResultsData?.contentNodes?.pageInfo?.endCursor,
                    },
                  });
                }}
              >
                Load more
              </Button>
            </div>
          )}

          {!searchResultsLoading && searchResultsData === undefined && (
            <SearchRecommendations categories={categories} />
          )}
        </div>
      </Main>
    </>
  );
}

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    categories {
      nodes {
        databaseId
        uri
        name
      }
    }
  }
`;

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, { Page });
}
