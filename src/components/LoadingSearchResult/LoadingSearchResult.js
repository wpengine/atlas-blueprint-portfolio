import styles from './LoadingSearchResult.module.scss';

/**
 * A component that mimics a search result in a loading state for better
 * perceived performance.
 *
 * @returns {React.ReactElement} The LoadingSearchResults component.
 */
export default function LoadingSearchResult() {
  return (
    <div className={styles['loading-result']}>
      <div className={styles['loading-result-title']} />
      <div className={styles['loading-result-meta']} />
      <div className={styles['loading-result-excerpt']} />
    </div>
  );
}
