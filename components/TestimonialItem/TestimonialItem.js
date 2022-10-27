import className from 'classnames/bind';

import styles from './TestimonialItem.module.scss';
const cx = className.bind(styles);

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
    <div className={cx('container')}>
      <div className={cx('content')}>{children}</div>

      {author && <div className={cx('author')}>{author}</div>}
    </div>
  );
}
