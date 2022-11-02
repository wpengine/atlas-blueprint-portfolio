import { relayStylePagination } from '@apollo/client/utilities';

export class RelayStylePaginationPlugin {
  constructor() {}

  apply(hooks) {
    hooks.addFilter(
      'apolloClientInMemoryCacheOptions',
      'RelayStylePagination',
      (data) => {
        return {
          ...data,
          typePolicies: {
            ...data.typePolicies,
            RootQuery: {
              ...data.typePolicies.RootQuery,
              fields: {
                ...data.typePolicies.RootQuery.fields,
                posts: relayStylePagination(),
              },
            },
          },
        };
      }
    );
  }
}
