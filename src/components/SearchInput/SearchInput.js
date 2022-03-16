import styles from './SearchInput.module.scss';

export default function SearchInput({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}
