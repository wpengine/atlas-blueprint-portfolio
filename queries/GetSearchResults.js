import { gql } from '@apollo/client';

export const GetSearchResults = gql`
  query GetSearchResults($first: Int!, $after: String, $search: String) {
    contentNodes(first: $first, after: $after, where: { search: $search }) {
      edges {
        node {
          id
          uri
          date
          databaseId
          ... on NodeWithTitle {
            title
          }
          ... on NodeWithExcerpt {
            excerpt
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
`;
