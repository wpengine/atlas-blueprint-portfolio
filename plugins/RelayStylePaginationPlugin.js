import { relayStylePagination } from '@apollo/client/utilities';

/**
 * This plugin adds Relay-style cursor pagination to the Faust/Apollo client
 * via the plugin system for posts/contentNodes
 *
 * @link https://www.apollographql.com/docs/react/pagination/cursor-based/#relay-style-cursor-pagination
 */
export class RelayStylePaginationPlugin {
  apply({ addFilter }) {
    addFilter('apolloClientInMemoryCacheOptions', 'faust', (options) => {
      const newOptions = options;

      if (!newOptions?.typePolicies?.RootQuery?.fields) {
        newOptions.typePolicies.RootQuery.fields = {};
      }

      newOptions.typePolicies.RootQuery.fields = {
        ...newOptions.typePolicies.RootQuery.fields,
        posts: relayStylePagination(),
        contentNodes: relayStylePagination(),
      };

      return newOptions;
    });
  }
}
