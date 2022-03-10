import styles from './TestimonialItem.module.scss';

/**
 * Render the testimonial item component
 *
 * @param {Props} props The props object.
 * @param {string} props.author The author of the testimonial.
 * @param {React.ReactElement} props.children The content of the testimonial.
 * @returns {React.ReactElement} The testimonial item component.
 */
export default function TestimonialItem({ author, children }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>

      {author && <div className={styles.author}>{author}</div>}
    </div>
  );
}
