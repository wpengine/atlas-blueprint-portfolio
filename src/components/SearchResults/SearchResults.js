import NextLinkWrapper from 'components/NextLinkWrapper';
import { getFormattedDate } from 'components/PostInfo';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchResults.module.scss';

export function LoadingSearchResult() {
  return (
    <div className={styles['loading-result']}>
      <div className={styles['loading-result-title']} />
      <div className={styles['loading-result-meta']} />
      <div className={styles['loading-result-excerpt']} />
    </div>
  );
}

export default function SearchResults({ searchResults, isLoading }) {
  if (!isLoading && searchResults === null) {
    return null;
  }

  if (!isLoading && !searchResults?.length) {
    return (
      <div className={styles['no-results']}>
        <FaSearch className={styles['no-results-icon']} />
        <div className={styles['no-results-text']}>No results</div>
      </div>
    );
  }

  return (
    <>
      {searchResults?.map((node) => (
        <div key={node?.databaseId} className={styles.result}>
          <NextLinkWrapper href={node?.uri}>
            <a>
              <h2 className={styles.title}>
                {node?.$on?.[node?.__typename].title()}
              </h2>
            </a>
          </NextLinkWrapper>
          <div className={styles.meta}>
            <span className={styles.date}>{getFormattedDate(node?.date)}</span>
          </div>
          <div
            className={styles.excerpt}
            dangerouslySetInnerHTML={{
              __html: node?.$on?.[node?.__typename]?.excerpt?.(),
            }}
          ></div>
        </div>
      ))}

      {isLoading === true && (
        <>
          <LoadingSearchResult />
          <LoadingSearchResult />
          <LoadingSearchResult />
        </>
      )}
    </>
  );
}
