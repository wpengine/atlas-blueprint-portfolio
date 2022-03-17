import { FaSearch } from 'react-icons/fa';
import styles from './SearchInput.module.scss';

export default function SearchInput({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <FaSearch className={styles.icon} />
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
