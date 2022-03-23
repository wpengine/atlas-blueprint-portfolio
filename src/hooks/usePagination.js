import React from 'react';
import { client } from 'client';
import appConfig from 'app.config';
import { uniqBy } from 'utils';

/**
 * usePagination hook is focused on performing paginated queries using a custom query function.
 * It accepts a list of initial nodes and pageInfo objects that are used for initial rendering.
 * If you have initial arguments to pass you can use the initialArgs parameter.
 * It returns a Result Object that contains the following:
 *
 * isLoading: To indicate the network status of the request
 * data: The current nodes and pageInfo objects that can be used to render the list of items
 * fetchMore: Main function to be used for fetching the next results in the paginated query.
 * You have the option to pass new pagination arguments that can be used to fetch the next results.

 * @param fn Query function to be used. It accepts two parameters. The query object to perform the actual query and the pagination arguments to use.
 * @param nodes Initial nodes array of objects
 * @param pageInfo Initial pageInfo object
 * @param initialArgs Initial pagination arguments
 * @returns {{isLoading: boolean, data: {nodes: *[], pageInfo: {}}, fetchMore: fetchMore}} Result object
 */
export default function usePagination(
  fn,
  {
    nodes = [],
    pageInfo = {},
    initialArgs = {
      first: appConfig.postsPerPage,
      after: undefined,
    },
  } = {}
) {
  const fnRef = React.useRef(fn);
  fnRef.current = fn;
  const [data, setData] = React.useState({
    nodes,
    pageInfo: pageInfo,
  });
  const [paginationArgs, setPaginationArgs] = React.useState(initialArgs);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (paginationArgs?.after) {
      setIsLoading(true);
      client.client
        .resolved(() => {
          return fnRef.current(client.client.query, paginationArgs);
        })
        .then((data) => {
          setData(function (prev) {
            return {
              // eslint-disable-next-line no-unsafe-optional-chaining
              nodes: uniqBy([...prev.nodes, ...data?.nodes], (v) => v.id),
              pageInfo: data?.pageInfo,
            };
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [paginationArgs]);

  const fetchMore = (args) => {
    setPaginationArgs(args);
  };

  return { data, fetchMore, isLoading };
}
