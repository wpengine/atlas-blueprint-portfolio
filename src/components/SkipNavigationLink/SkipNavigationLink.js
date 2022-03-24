import * as SELECTORS from 'constants/selectors';

import styles from './SkipNavigationLink.module.scss';

export default function SkipNavigationLink() {
  return (
    <a
      className={[styles['skip-nav-link'], 'sr-only'].join(' ')}
      href={`#${SELECTORS.MAIN_CONTENT_ID}`}
    >
      Skip To Main Content
    </a>
  );
}
