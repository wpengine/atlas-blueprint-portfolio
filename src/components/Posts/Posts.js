import React, { useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Heading, FeaturedImage, PostInfo } from 'components';
import appConfig from 'app.config';

import styles from './Posts.module.scss';

function Posts({ posts, intro, id }) {
  const linksRef = useRef([]);

  useEffect(() => {
    function focusIndex() {
      const partialSetLength = posts.length % appConfig.postsPerPage;
      const delta = partialSetLength === 0 ? appConfig.postsPerPage : partialSetLength;
      const focusIndex = posts.length - delta;

      return focusIndex;
    }

    linksRef.current[focusIndex()].focus();
  }, [posts]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section {...(id && { id })}>
      {intro && <p>{intro}</p>}
      <div className={styles['post-list']}>
        {posts?.map((post, index) => {
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
                    <a ref={(el) => linksRef.current[index] = el}>{post.title()}</a>
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
