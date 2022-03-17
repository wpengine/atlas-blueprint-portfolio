import NextLinkWrapper from 'components/NextLinkWrapper';
import { getFormattedDate } from 'components/PostInfo';
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
  if (!searchResults) {
    return null;
  }

  if (!searchResults.length) {
    return <>No results</>;
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
          <div className={styles.excerpt}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            elementum tincidunt sem quis bibendum. Integer leo urna, ullamcorper
            pretium tortor et, venenatis bibendum metus. Vestibulum
            pellentesque, erat quis varius iaculis, nisl mauris porta ipsum.
          </div>
        </div>
      ))}

      {isLoading && (
        <>
          <LoadingSearchResult />
          <LoadingSearchResult />
          <LoadingSearchResult />
        </>
      )}
    </>
  );
}
