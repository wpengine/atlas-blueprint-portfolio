import Link from 'next/link';
import styles from './TaxonomyTerms.module.scss';

export default function TaxonomyTerms({ post, taxonomy }) {
  const termLinks = post?.[taxonomy]?.()?.edges.map((edge, index) => {
    const { name, uri } = edge?.node;
    return (
      uri && (
        <Link key={index} href={uri}>
          {name}
        </Link>
      )
    );
  });

  if (0 === termLinks.length) {
    return null;
  }

  return (
    <div>
      <span className={styles['taxonomy']}>{taxonomy}:</span>
      <span className={styles['term-links']}>{termLinks}</span>
    </div>
  );
}
