import React from 'react';
import { gql } from '@apollo/client';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Heading, FeaturedImage, PostInfo } from 'components';
import appConfig from 'app.config';
import useFocusFirstNewResult from 'hooks/useFocusFirstNewResult';

import styles from './Posts.module.scss';
let cx = classNames.bind(styles);

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
      <div className={cx('post-list')}>
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
              className={cx('container')}
              key={post.id ?? ''}
              id={`post-${post.id}`}
            >
              <div className={cx('card')}>
                <Link legacyBehavior href={post?.uri ?? '#'}>
                  <a className={cx('image-holder')} tabIndex="-1">
                    <FeaturedImage
                      className={cx('image')}
                      image={image}
                      width={340}
                      height={340}
                      priority={i < appConfig.postsAboveTheFold}
                    />
                  </a>
                </Link>

                <Heading level="h4" className={cx('header')}>
                  <Link legacyBehavior href={post?.uri ?? '#'}>
                    <a ref={isFirstNewResult ? firstNewResultRef : null}>
                      {post.title}
                    </a>
                  </Link>
                </Heading>
                <PostInfo
                  className={cx('info')}
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

Posts.fragments = {
  entry: gql`
    ${FeaturedImage.fragments.entry}
    fragment PostsItemFragment on Post {
      id
      date
      uri
      title
      author {
        node {
          name
        }
      }
      ...FeaturedImageFragment
    }
  `,
};

export default Posts;
