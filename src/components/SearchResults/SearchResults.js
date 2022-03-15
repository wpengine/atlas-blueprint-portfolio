import NextLinkWrapper from 'components/NextLinkWrapper';
import styles from './SearchResults.module.scss';

export default function SearchResults({ searchResults }) {
  if (!searchResults) {
    return null;
  }

  return searchResults.map((node) => (
    <NextLinkWrapper key={node.id} href={node?.uri}>
      <a className={styles.result}>
        <h3 className={styles.title}>{node?.uri}</h3>
        <div
          className={styles.excerpt}
          dangerouslySetInnerHTML={{ __html: node?.excerpt }}
        />
      </a>
    </NextLinkWrapper>
  ));
}
