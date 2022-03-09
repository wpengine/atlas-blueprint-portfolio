import appConfig from '../../app.config';
import React from 'react';

export default function LoadMore({pageInfo, isLoading, fetchMore}) {
  if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
    return <button
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
  }
  return null;
}