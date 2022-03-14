import React from 'react';
import { FeaturedImage, Heading } from 'components';
import styles from './ProjectHeader.module.scss';

function ProjectHeader({ image, title, summary }) {
  return (
    <section className={styles['header']}>
      <div className="container">
        <div className="row row-center">
          <FeaturedImage className="column column-50" image={image} />
          <div className="column column-50">
            <Heading level="h2">{title}</Heading>
            <p>{summary}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectHeader;
