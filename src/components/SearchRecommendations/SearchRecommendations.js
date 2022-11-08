import Link from 'next/link';
import { client } from 'client';

import styles from './SearchRecommendations.module.scss';

const recommendedPostsLimit = 5;

/**
 * Render the SearchRecommendations component.
 *
 * @returns {React.ReactElement} The SearchRecommendations component.
 */
export default function SearchRecommendations() {
  const { useQuery } = client;
  const recentPostNodes = useQuery().posts({
    first: recommendedPostsLimit,
  })?.nodes;
  const categoryNodes = useQuery()?.categories()?.nodes;

  return (
    <div className={styles.recommendations}>
      <h4>Recent Posts</h4>
      <ul>
        {recentPostNodes?.map((node) => (
          <li key={node?.databaseId ?? 0}>
            <Link href={node?.uri ?? '#'}>
              <a>{node.title()}</a>
            </Link>
          </li>
        ))}
      </ul>

      <h4>Browse by Category</h4>
      <ul>
        {categoryNodes?.map((node) => (
          <li key={node?.databaseId ?? 0}>
            <Link href={node?.uri ?? '#'}>
              <a>{node.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
