import appConfig from 'app.config';
import React from 'react';

import styles from './LoadMore.module.scss';

export default function LoadMore({
  hasNextPage,
  endCursor,
  isLoading,
  fetchMore,
  className,
}) {
  if (hasNextPage && endCursor) {
    return (
      <section className={className}>
        <button
          className={styles.button}
          disabled={isLoading}
          onClick={() => {
            fetchMore({
              first: appConfig.postsPerPage,
              after: endCursor,
            });
          }}
        >
          LOAD MORE
        </button>
      </section>
    );
  }
  return null;
}
