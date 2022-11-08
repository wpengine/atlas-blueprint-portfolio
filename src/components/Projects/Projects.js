import React from 'react';
import Link from 'next/link';
import { Heading, FeaturedImage } from 'components';
import useFocusFirstNewResult from 'hooks/useFocusFirstNewResult';

import styles from './Projects.module.scss';
/**
 * Renders a list of Project items
 * @param {Props} props The props object.
 * @param {Project[]} props.projects The array of project items.
 * @param {string} props.id The unique id for this component.
 * @param {string} props.emptyText Message to show when there are no projects.
 * @returns {React.ReactElement} The Projects component
 */
function Projects({ projects, id, emptyText = 'No projects found.' }) {
  const { firstNewResultRef, firstNewResultIndex } =
    useFocusFirstNewResult(projects);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section {...(id && { id })}>
      {projects?.map((project, i) => {
        const isFirstNewResult = i === firstNewResultIndex;

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
                  <Link href={project?.uri ?? '#'}>
                    <a ref={isFirstNewResult ? firstNewResultRef : null}>
                      {project.title()}
                    </a>
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
