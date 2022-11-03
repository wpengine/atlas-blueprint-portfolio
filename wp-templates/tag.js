import { gql, useQuery } from '@apollo/client';
import { pageTitle } from 'utilities';

import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  LoadMore,
  Main,
  Posts,
  EntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
} from '../components';
import appConfig from 'app.config';

export default function Component(props) {
  const { uri } = props.__SEED_NODE__;
  const { data, loading, fetchMore } = useQuery(Component.query, {
    variables: {
      uri,
      first: appConfig.postsPerPage,
      after: '',
      headerLocation: MENUS.PRIMARY_LOCATION,
      footerLocation: MENUS.FOOTER_LOCATION,
    },
  });

  if (loading) {
    return <></>;
  }

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];
  const { name, posts } = data.nodeByUri;
  const postList = posts.edges.map((el) => el.node);

  return (
    <>
      <SEO
        title={pageTitle(
          props?.data?.generalSettings,
          `Tag: ${name}`,
          siteTitle
        )}
        description={siteDescription}
      />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          <EntryHeader title={`Tag: ${name}`} />
          <div className="container">
            <Posts posts={postList} />
            <LoadMore
              className="text-center"
              hasNextPage={posts.pageInfo.hasNextPage}
              endCursor={posts.pageInfo.endCursor}
              isLoading={loading}
              fetchMore={fetchMore}
            />
          </div>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetTagPage(
    $uri: String!
    $first: Int!
    $after: String!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    nodeByUri(uri: $uri) {
      ... on Tag {
        name
        posts(first: $first, after: $after) {
          edges {
            node {
              id
              title
              content
              date
              uri
              ...FeaturedImageFragment
              author {
                node {
                  name
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
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

Component.variables = ({ uri }) => {
  return {
    uri,
    first: appConfig.postsPerPage,
    after: '',
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
