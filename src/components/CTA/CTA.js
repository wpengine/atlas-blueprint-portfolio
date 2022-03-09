import styles from "./CTA.module.scss";

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
