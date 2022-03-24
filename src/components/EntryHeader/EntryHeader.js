import {
    FeaturedImage,
    Heading,
    PostInfo,
} from 'components';

import styles from './EntryHeader.module.scss';

export default function EntryHeader({ title, image, date, author }) {
    const hasText = title || date || author;

    return (
        <div className={styles['entry-header']}>
            {hasText && (
                <div className={styles['text']}>
                    {!!title && <Heading className={styles['title']}>{title}</Heading>}
                    <PostInfo
                        className={styles['byline']}
                        author={author}
                        date={date}
                    />
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
