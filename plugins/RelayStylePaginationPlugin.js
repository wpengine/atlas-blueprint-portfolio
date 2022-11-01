import { relayStylePagination } from '@apollo/client/utilities';

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
