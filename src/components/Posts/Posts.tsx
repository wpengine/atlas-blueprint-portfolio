import React from 'react';
import Link from 'next/link';
import type { Post } from 'client';
import styles from './Posts.module.scss';

interface PostInfoProps {
  post: Post | undefined;
}

function PostInfo({post}: PostInfoProps) {
  const formatOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric'};
  const postedAt = new Date(post?.date).toLocaleDateString("en-US", formatOptions) ?? '';
  return <p className={styles['post-info']}>{postedAt} By {post?.author?.node?.name ?? ''}</p>
}

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
      <div className="row row-wrap">
        {posts?.map((post) => (
          <div
            className="column column-33 text-center"
            key={post.id ?? ''}
            id={`post-${post.id}`}>
            <div>
              <h4>
                <Link href={`/posts/${post.slug}`}>
                  <a>{post.title()}</a>
                </Link>
              </h4>
              <PostInfo post={post} />
            </div>
          </div>
        ))}
        {posts && posts?.length < 1 && <p>No posts found.</p>}
      </div>
    </section>
  );
}

export default Posts;
