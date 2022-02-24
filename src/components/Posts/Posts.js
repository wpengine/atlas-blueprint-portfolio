import React from 'react';
import Link from 'next/link';
import { Heading, FeaturedImage } from 'components';
import styles from './Posts.module.scss';

function PostInfo({post}) {
  const formatOptions = { year: 'numeric', month: 'long', day: 'numeric'};
  const postedAt = new Date(post?.date).toLocaleDateString("en-US", formatOptions) ?? '';
  return <p className={styles['post-info']}>{postedAt} By {post?.author?.node?.name ?? ''}</p>
}

function Posts({
                 posts,
                 intro,
                 id,
               }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section {...(id && { id })}>
      {intro && <p>{intro}</p>}
      <div className="row row-wrap">
        {posts?.map((post) => {
          return (
            <div
              className="column column-33 text-center"
              key={post.id ?? ''}
              id={`post-${post.id}`}>
              <div>
                <FeaturedImage image={post?.featuredImage?.node?.sourceUrl()} alt={post?.featuredImage?.node?.altText} />
                <Heading level="h4" className={styles['post-header']}>
                  <Link href={`/posts/${post.slug}`}>
                    <a>{post.title()}</a>
                  </Link>
                </Heading>
                <PostInfo post={post}/>
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
