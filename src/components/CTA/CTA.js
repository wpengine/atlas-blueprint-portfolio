import styles from './CTA.module.scss';

/**
 * Render the CTA component.
 *
 * @param {Props} props The props object.
 * @param {() => React.ReactElement} props.Button The button component to be rendered.
 * @param {React.ReactElement} props.children The children to be rendered.
 * @returns {React.ReactElement} The CTA component.
 */
export default function CTA({ Button, children }) {
  return (
    <div className={styles.cta}>
      <div className={styles.content}>{children}</div>

      {Button && (
        <div className={styles.action}>
          <Button />
        </div>
      )}
    </div>
  );
}
