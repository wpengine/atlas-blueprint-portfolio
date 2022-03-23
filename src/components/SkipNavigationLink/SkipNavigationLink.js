import * as SELECTOR from 'constants/selectors';

import styles from './SkipNavigationLink.module.scss';

export default function SkipNavigationLink() {
  return (
    <a
      className={[styles['skip-nav-link'], 'sr-only'].join(' ')}
      href={`#${SELECTOR.MAIN_CONTENT_ID}`}
    >
      Skip To Main Content
    </a>
  );
}
