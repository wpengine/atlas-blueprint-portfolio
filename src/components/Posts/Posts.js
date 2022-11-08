import React from 'react';
import Link from 'next/link';
import { Heading, FeaturedImage, PostInfo } from 'components';
import appConfig from 'app.config';
import useFocusFirstNewResult from 'hooks/useFocusFirstNewResult';

import styles from './Posts.module.scss';

/**
 * Renders a list of Post items
 * @param {Props} props The props object.
 * @param {Post[]} props.posts The array of post items.
 * @param {string} props.id The unique id for this component.
 * @param {string} props.intro Message to show as an introduction text.
 * @returns {React.ReactElement} The Projects component
 */
function Posts({ posts, intro, id }) {
  const { firstNewResultRef, firstNewResultIndex } =
    useFocusFirstNewResult(posts);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section {...(id && { id })}>
      {intro && <p>{intro}</p>}
      <div className={styles['post-list']}>
        {posts?.map((post, i) => {
          const isFirstNewResult = i === firstNewResultIndex;
          let image = post?.featuredImage?.node;

          if (!image && appConfig.archiveDisplayFeaturedImage) {
            image = {
              sourceUrl: '/static/banner.jpeg',
              altText: 'Downtown Austin, Texas skyline',
            };
          }

          return (
            <div
              className={styles.container}
              key={post.id ?? ''}
              id={`post-${post.id}`}
            >
              <div className={styles.card}>
                <Link href={post?.uri ?? '#'}>
                  <a className={styles[`image-holder`]} tabIndex="-1">
                    <FeaturedImage
                      className={styles.image}
                      image={image}
                      width={340}
                      height={340}
                    />
                  </a>
                </Link>

                <Heading level="h4" className={styles.header}>
                  <Link href={post?.uri ?? '#'}>
                    <a ref={isFirstNewResult ? firstNewResultRef : null}>
                      {post.title()}
                    </a>
                  </Link>
                </Heading>
                <PostInfo
                  className={styles.info}
                  author={post?.author?.node?.name}
                  date={post?.date}
                />
              </div>
            </div>
          );
        })}
        {posts && posts?.length < 1 && <p>No posts found.</p>}
      </div>
    </section>
  );
}

export default Posts;
