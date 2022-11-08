import { FeaturedImage, Heading, PostInfo } from 'components';

import styles from './EntryHeader.module.scss';
/**
 * A Page or Post entry header component
 * @param {Props} props The props object.
 * @param {string} props.title The post/page title.
 * @param {MediaItem} props.image The image node.
 * @param {string} props.date The post/page publish date.
 * @param {string} props.author The post/page author's name.
 * @param {string} props.className An optional className to be added to the EntryHeader.
 * @return {React.ReactElement} The EntryHeader component.
 */
export default function EntryHeader({ title, image, date, author, className }) {
  const hasText = title || date || author;
  const entryHeaderClasses = [styles['entry-header'], className].join(' ');

  return (
    <div className={entryHeaderClasses}>
      {hasText && (
        <div className={styles['text']}>
          {!!title && <Heading className={styles['title']}>{title}</Heading>}
          <PostInfo className={styles['byline']} author={author} date={date} />
        </div>
      )}

      {image && (
        <div className={styles['image']}>
          <div className="container">
            <FeaturedImage
              className={styles['featured-image']}
              image={image}
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
