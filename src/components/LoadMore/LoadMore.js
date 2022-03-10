import appConfig from '../../app.config';
import React from 'react';
import styles from './LoadMore.module.scss';

export default function LoadMore({
  pageInfo,
  isLoading,
  fetchMore,
  className,
}) {
  if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
    return (
      <section className={[className, styles.loadMore].join(' ')}>
        <button
          disabled={isLoading}
          onClick={() => {
            fetchMore({
              first: appConfig.postsPerPage,
              after: pageInfo?.endCursor,
            });
          }}
        >
          Load more Posts
        </button>
      </section>
    );
  }
  return null;
}
