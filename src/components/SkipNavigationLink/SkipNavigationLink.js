import styles from './SkipNavigationLink.module.scss';
import * as SELECTOR from 'constants/selectors';

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
