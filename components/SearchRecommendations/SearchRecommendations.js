import Link from 'next/link';

import styles from './SearchRecommendations.module.scss';

/**
 * Render the SearchRecommendations component.
 *
 * @param {Props} props The props object.
 * @param {Array} props.categories Array of categories from WordPress
 *
 * @returns {React.ReactElement} The SearchRecommendations component.
 */
export default function SearchRecommendations({ categories }) {
  return (
    <div className={styles.recommendations}>
      <h4>Browse by Category</h4>
      <ul>
        {categories?.map((node) => (
          <li key={node.databaseId}>
            <Link href={node.uri}>
              <a>{node.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
