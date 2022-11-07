import { relayStylePagination } from '@apollo/client/utilities';

export class RelayStylePaginationPlugin {
  constructor() {}

  apply(hooks) {
    hooks.addFilter('apolloClientInMemoryCacheOptions', 'faust', (options) => {
      return {
        ...options,
        typePolicies: {
          ...options.typePolicies,
          RootQuery: {
            ...options.typePolicies.RootQuery,
            fields: {
              ...options.typePolicies.RootQuery.fields,
              posts: relayStylePagination(),
              projects: relayStylePagination(),
            },
          },
          ContentType: {
            fields: {
              contentNodes: relayStylePagination(),
            },
          },
          Category: {
            fields: {
              contentNodes: relayStylePagination(),
            },
          },
          Tag: {
            fields: {
              contentNodes: relayStylePagination(),
            },
          },
        },
      };
    });
  }
}
