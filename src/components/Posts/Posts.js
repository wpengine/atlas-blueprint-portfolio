import React from 'react';
import Link from 'next/link';
import { Heading, FeaturedImage, PostInfo } from 'components';
import styles from './Posts.module.scss';

function Posts({ posts, intro, id }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section {...(id && { id })}>
      {intro && <p>{intro}</p>}
      <div className={styles['post-list']}>
        {posts?.map((post) => {
          return (
            <div
              className={styles.container}
              key={post.id ?? ''}
              id={`post-${post.id}`}
            >
              <div className={styles.card}>
                <div className={styles[`image-holder`]}>
                  <FeaturedImage
                    className={styles.image}
                    image={post?.featuredImage?.node}
                    alt={post?.featuredImage?.node?.altText}
                    width={340}
                    height={340}
                  />
                </div>
                <Heading level="h4" className={styles.header}>
                  <Link href={post.uri ?? '#'}>
                    <a>{post.title()}</a>
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
