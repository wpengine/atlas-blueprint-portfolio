import * as SELECTORS from 'constants/selectors';

import styles from './SkipNavigationLink.module.scss';
/**
 * Renders a hidden link for skip navigation.
 * @returns {React.ReactElement} The SkipNavigationLink component
 */
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
