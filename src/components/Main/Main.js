import * as SELECTORS from 'constants/selectors';

import styles from './Main.module.scss';

/**
 * Render the Main component.
 *
 * @param {Props} props The props object.
 * @param {string} props.className Optional class name.
 * @param {React.ReactElement} props.children The children to be rendered.
 * @returns {React.ReactElement} The Main component.
 */
export default function Main({ children, className, ...props }) {
  return (
    <main
      id={SELECTORS.MAIN_CONTENT_ID}
      tabIndex="-1"
      className={[styles.main, className].join(' ')}
      {...props}
    >
      {children}
    </main>
  );
}
