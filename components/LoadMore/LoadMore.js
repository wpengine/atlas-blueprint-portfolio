import React from 'react';

import styles from './LoadMore.module.scss';
/**
 * LoadMore shows a Button that can be clicked to load more results in a paginated post list.
 * @param {Props} props The props object.
 * @param {boolean} props.hasNextPage Flag to use if there are more results to load.
 * @param {string} props.endCursor The next pagination cursor string.
 * @param {boolean} props.isLoading Flag that indicates whether the pagination is loading.
 * @param {(object) => void} props.fetchMore Callback function to trigger the next pagination request.
 * @param {string} props.className An optional className to be added to the container.
 *
 * @return {React.ReactElement} The LoadMore component.
 */
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
              variables: {
                after: endCursor,
              },
            });
          }}
        >
          Load More
        </button>
      </section>
    );
  }
  return null;
}
