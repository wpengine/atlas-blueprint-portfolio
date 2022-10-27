import Link from 'next/link';
import classNames from 'classnames/bind';

import styles from './TaxonomyTerms.module.scss';
let cx = classNames.bind(styles);
/**
 * Renders a list of taxonomy terms and term links for a given post
 * @param {Props} props The props object.
 * @param {Post} props.post The Post GraphQL Node.
 * @param {string} props.taxonomy The taxonomy type.
 * @returns {React.ReactElement} The TaxonomyTerms component
 */
export default function TaxonomyTerms({ post, taxonomy }) {
  const termLinks = post?.[taxonomy]?.edges.map((edge, index) => {
    const { name, uri } = edge.node;
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
      <span className={cx('taxonomy')}>{taxonomy}:</span>
      <span className={cx('term-links')}>{termLinks}</span>
    </div>
  );
}
