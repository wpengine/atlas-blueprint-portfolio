import React from 'react';
import { FeaturedImage, Heading } from 'components';
import className from 'classnames/bind';

import styles from './ProjectHeader.module.scss';
const cx = className.bind(styles);
/**
 * A Project entry header component
 * @param {MediaItem} props.image The project image node.
 * @param {string} props.title The project title.
 * @param {string} props.summary The project summary.
 * @returns {React.ReactElement} The PostInfo component
 */
function ProjectHeader({ image, title, summary }) {
  return (
    <section className={cx('header')}>
      <div className="container">
        <div className="row row-center">
          <FeaturedImage className={cx('column')} image={image} />
          <div className={cx('column')}>
            <Heading level="h2">{title}</Heading>
            <p>{summary}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectHeader;
