import appConfig from 'app.config';
import { client } from 'client';
import { useRef } from 'react';

/**
 * Default prepass items for posts. This lists all the pieces of data we need
 * for each post node. Running the following through `prepass` ensures that
 * all of the data is there when we need it, and no cascading requests happen.
 *
 * @see https://gqty.dev/docs/client/helper-functions#prepass
 */
export const defaultPostPrepassItems = [
  'databaseId',
  'id',
  '__typename',
  'featuredImage.*',
  'featuredImage.node.altText',
  'featuredImage.node.mediaDetails.width',
  'featuredImage.node.mediaDetails.height',
  'featuredImage.node.sourceUrl',
  'author.node.name',
  'date',
  'uri',
  'title',
  'slug',
];

export const defaultProjectPrepassItems = [
  ...defaultPostPrepassItems,
  'summary',
];

/**
 * The `useNodePagination` hook is an abstraction of the `usePaginatedQuery` from GQty that enables
 * you to specify a query to get nodes and page info, and will fetch those initial items, as well
 * as provide a mechanism to fetch more.
 *
 * @param {(query, queryArgs) => Function} queryFn The query function to get your `nodes` and `pageInfo`.'
 * @param {array|undefined} prepassItems Optional: An array of items to pass to the `prepass()` GQty helper function.
 * @returns
 */
export default function useNodePagination(queryFn, prepassItems) {
  const queryFnRef = useRef(queryFn);

  /**
   * Use the `usePaginatedQuery` from GQty to fetch the initial posts and
   * create a `fetchMore` method that can be used to fetch more posts.
   *
   * @see https://gqty.dev/docs/react/fetching-data#usepaginatedquery
   */
  const { data, fetchMore, isLoading } = client.usePaginatedQuery(
    (query, input, { prepass }) => {
      /**
       * Call the query function provided as an argument to get the appropriate
       * nodes and page info.
       */
      const res = queryFnRef.current(query, input);

      /**
       * If there was user defined prepassItems use them.
       * Otherwise, use the defaults.
       */
      let prepassList = prepassItems ?? defaultPostPrepassItems;

      /**
       * Do a prepass for the data requirements we need so all data
       * will be fetched in one request and no chance for cascading.
       *
       * @see https://gqty.dev/docs/client/helper-functions#prepass
       */
      prepass(res?.nodes, ...prepassList);

      return {
        nodes: res?.nodes,
        hasNextPage: res?.pageInfo?.hasNextPage,
        endCursor: res?.pageInfo?.endCursor,
      };
    },
    {
      /**
       * Required, only used for the first fetch
       */
      initialArgs: {
        first: appConfig?.postsPerPage,
      },
      /**
       * Optional merge function
       */
      merge({ data: { existing, incoming }, uniqBy }) {
        if (existing) {
          return {
            ...incoming,
            // If using 'cache-and-network', you have to use `uniqBy`
            nodes: uniqBy([...existing.nodes, ...incoming.nodes], (v) => v.id),
          };
        }
        return incoming;
      },
    }
  );

  return { data, fetchMore, isLoading };
}
