import appConfig from 'app.config';
import { client } from 'client';
import { useRef } from 'react';

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
       * If prepassItems is defined, do a prepass for the data requirements
       * we want so all data will be fetched in one request.
       *
       * @see https://gqty.dev/docs/client/helper-functions#prepass
       */
      if (prepassItems) {
        prepass(res?.nodes, ...prepassItems);
      }

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
