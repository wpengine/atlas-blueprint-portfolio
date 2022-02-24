import Link from 'next/link';
import styles from './Pagination.module.scss';

function NextPageNavigation(props) {
  return (
    <Link href={props.href}>
      <a aria-label={'Next page.'}>Next Page →</a>
    </Link>
  );
}

function PreviousPageNavigation(props) {
  return (
    <Link href={props.href}>
      <a aria-label={'Previous page.'}>← Previous Page</a>
    </Link>
  );
}


export default function Pagination({ pageInfo, basePath }) {
  const previousPageUrl = `${basePath}/before/${pageInfo?.startCursor}`;
  const nextPageUrl = `${basePath}/after/${pageInfo?.endCursor}`;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <ul className={styles.pagination__controls}>
        {pageInfo.hasPreviousPage && (
          <li className="pagination__previous">
            <PreviousPageNavigation href={previousPageUrl} />
          </li>
        )}

        {pageInfo.hasNextPage && (
          <li className="pagination__next">
            <NextPageNavigation href={nextPageUrl} />
          </li>
        )}
      </ul>
    </nav>
  );
}