import { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchInput.module.scss';

export default function SearchInput({ value, onChange }) {
  const input = useRef();

  useEffect(() => {
    input.current.value = '';
    input.current.focus();
  }, []);

  return (
    <div className={styles.wrapper}>
      <FaSearch className={styles.icon} />
      <label className="sr-only" htmlFor="search">
        Search
      </label>

      <input
        ref={input}
        id="search"
        name="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        onFocus={(e) => e.target.select()}
        type="text"
        placeholder="Start typing..."
      />
    </div>
  );
}
