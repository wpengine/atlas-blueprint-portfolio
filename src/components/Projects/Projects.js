import React from 'react';
import Link from 'next/link';
import { Heading, FeaturedImage } from 'components';

import styles from './Projects.module.scss';

function Projects({ projects, id, emptyText = 'No projects found.' }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section {...(id && { id })}>
      {projects?.map((project) => {
        return (
          <div
            className="row"
            key={project.id ?? ''}
            id={`project-${project.id}`}
          >
            <div className={styles['list-item']}>
              <FeaturedImage
                className={styles.image}
                image={project?.featuredImage?.node}
              />
              <div className={styles.content}>
                <Heading level="h3">
                  {/*
                    Hardcoded CPT slug to be removed once ACM supports the
                    `with_front` register_post_type() option.
                    https://github.com/wpengine/atlas-content-modeler/discussions/457
                  */}
                  <Link href={`projects/${project.slug}` ?? '#'}>
                    <a>{project.title()}</a>
                  </Link>
                </Heading>
                <div>{project.summary}</div>
              </div>
            </div>
          </div>
        );
      })}
      {projects && projects?.length < 1 && <p>{emptyText}</p>}
    </section>
  );
}

export default Projects;
