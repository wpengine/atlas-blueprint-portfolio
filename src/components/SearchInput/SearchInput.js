import { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

import styles from './SearchInput.module.scss';

/**
 * Render the SearchInput component.
 *
 * @param {Props} props The props object.
 * @param {string} props.value The search input value
 * @param {(newValue: string) => void} props.onChange The search input onChange handler
 * @returns {React.ReactElement} The SearchInput component.
 */
export default function SearchInput({ value, onChange, ...props }) {
  const input = useRef();

  // Clear and focus the input on initial render
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
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        autoFocus
        onFocus={(e) => e.target.select()}
        type="text"
        placeholder="Start typing..."
        {...props}
      />
    </div>
  );
}
