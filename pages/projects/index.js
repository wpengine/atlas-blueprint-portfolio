import * as MENUS from 'constants/menus';

import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {
  FeaturedImage,
  Footer,
  Header,
  EntryHeader,
  LoadMore,
  Main,
  Projects,
  SEO,
  NavigationMenu,
} from 'components';
import { getNextStaticProps } from '@faustwp/core';
import { pageTitle } from 'utilities';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import appConfig from 'app.config';

export default function Page() {
  const { data, loading, fetchMore } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  if (loading) {
    return <></>;
  }

  const { title: siteTitle } = data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];
  const projectList = data?.projects?.nodes ?? [];
  return (
    <>
      <SEO title={pageTitle(data?.generalSettings, 'Projects')} />

      <Header menuItems={primaryMenu} />

      <Main>
        <EntryHeader title="Projects" />
        <div className="container">
          <Projects projects={projectList} id="project-list" />
          <LoadMore
            className="text-center"
            hasNextPage={data.projects.pageInfo.hasNextPage}
            endCursor={data.projects.pageInfo.endCursor}
            isLoading={loading}
            fetchMore={fetchMore}
          />
        </div>
      </Main>

      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  ${Projects.fragments.entry}
  query GetProjectsPage(
    $first: Int!
    $after: String!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    projects(first: $first, after: $after) {
      nodes {
        ...ProjectsFragment
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
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
  }
`;

Page.variables = () => {
  return {
    first: appConfig.projectsPerPage,
    after: '',
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
  });
}
