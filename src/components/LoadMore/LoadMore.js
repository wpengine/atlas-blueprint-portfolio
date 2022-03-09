import appConfig from '../../app.config';
import React from 'react';

export default function LoadMore({pageInfo, isLoading, fetchMore}) {
  if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
    return (<section className="text-center">
      <button
        disabled={isLoading}
        onClick={() => {
          fetchMore({
            first: appConfig.postsPerPage,
            after: pageInfo?.endCursor
          });
        }}
      >
        Load more Posts
      </button>
    </section>)
  }
  return null;
}
