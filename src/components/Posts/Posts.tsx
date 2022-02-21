import React from 'react';
import Link from 'next/link';
import type { Post } from 'client';
import styles from './Posts.module.scss';

interface Props {
  posts: Post[] | undefined;
  intro?: string;
  id?: string;
  heading?: string;
  readMoreText?: string;
}

function Posts({
                 posts,
                 intro,
                 heading,
                 id,
                 readMoreText = 'Read more',
               }: Props): JSX.Element {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section {...(id && { id })}>
      {intro && <p>{intro}</p>}
      <div className={styles.posts}>
        {posts?.map((post) => (
          <div
            className={styles.posts__single}
            key={post.id ?? ''}
            id={`post-${post.id}`}>
            <div>
              <h3>
                <Link href={`/posts/${post.slug}`}>
                  <a>{post.title()}</a>
                </Link>
              </h3>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: post.excerpt() ?? '' }}
              />
              <Link href={`/posts/${post.slug}`}>
                <a aria-label={`Read more about ${post.title || 'the post'}`}>
                  {readMoreText}
                </a>
              </Link>
            </div>
          </div>
        ))}
        {posts && posts?.length < 1 && <p>No posts found.</p>}
      </div>
    </section>
  );
}

export default Posts;
