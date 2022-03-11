import styles from './Main.module.scss';

/**
 * Render the Main component.
 *
 * @param {Props} props The props object.
 * @param {string} props.className Optional class name.
 * @param {React.ReactElement} props.children The children to be rendered.
 * @returns {React.ReactElement} The Main component.
 */
export default function Main({ children, className }) {
  return (
    <main className={[styles.main, className || undefined].join(' ')}>
      {children}
    </main>
  );
}
