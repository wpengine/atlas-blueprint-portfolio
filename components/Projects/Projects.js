import { gql } from '@apollo/client';
import React from 'react';
import Link from 'next/link';
import { Heading, FeaturedImage } from 'components';
import className from 'classnames/bind';
import useFocusFirstNewResult from 'hooks/useFocusFirstNewResult';
import appConfig from 'app.config';

import styles from './Projects.module.scss';
const cx = className.bind(styles);

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
      {projects.map((project, i) => {
        const isFirstNewResult = i === firstNewResultIndex;

        return (
          <div
            className="row"
            key={project.id ?? ''}
            id={`project-${project.id}`}
          >
            <div className={cx('list-item')}>
              <FeaturedImage
                className={cx('image')}
                image={project?.featuredImage?.node}
                priority={i < appConfig.projectsAboveTheFold}
              />
              <div className={cx('content')}>
                <Heading level="h3">
                  <Link legacyBehavior href={project?.uri ?? '#'}>
                    <a ref={isFirstNewResult ? firstNewResultRef : null}>
                      {project.projectFields.title}
                    </a>
                  </Link>
                </Heading>
                <div>{project.projectFields.summary}</div>
              </div>
            </div>
          </div>
        );
      })}
      {projects && projects?.length < 1 && <p>{emptyText}</p>}
    </section>
  );
}

Projects.fragments = {
  entry: gql`
    fragment ProjectsFragment on Project {
      id
      uri
      projectFields {
        title: projectTitle
        summary
        contentArea
      }
      ...FeaturedImageFragment
    }
  `,
};

export default Projects;
