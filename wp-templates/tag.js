import { gql } from '@apollo/client';
import { pageTitle } from 'utilities';

import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Posts,
  EntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
} from '../components';

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { name, posts } = props.data.nodeByUri;
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
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    nodeByUri(uri: $uri) {
      ... on Tag {
        name
        posts {
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
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
