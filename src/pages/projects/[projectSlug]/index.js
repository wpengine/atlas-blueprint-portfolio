import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import {
  Header,
  Footer,
  ProjectHeader,
  ContentWrapper,
  Main,
} from 'components';
import Head from 'next/head';

export function ProjectComponent({ project }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Head>
        <title>
          {project?.title()} - {generalSettings?.title}
        </title>
      </Head>

      <Header title={project?.title()} />

      <ProjectHeader
        image={project?.featuredImage?.node}
        summary={project?.summary}
        title={project?.title()}
      />

      <Main className="container">
        <ContentWrapper content={project?.contentArea} />
      </Main>

      <Footer />
    </>
  );
}

export default function Page({ id }) {
  const { useQuery } = client;
  const project = useQuery().project({
    id,
    idType: 'SLUG',
  });

  return <ProjectComponent project={project} />;
}

export async function getStaticProps(context) {
  const { projectSlug } = context?.params;

  return getNextStaticProps(context, {
    Page,
    client,
    props: {
      id: projectSlug,
    },
    notFound: await is404Cpt(projectSlug, 'project'),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

/**
 * Checks if a post is available given a custom post type.
 * Temporary until Faust's is404() is adjusted to account for custom post types.
 * @param {string} slug The slug of the custom post type.
 * @param {string} customPostType The WordPress custom post type.
 * @returns {bool}
 */
async function is404Cpt(slug, customPostType) {
  const customPostTypePost = await client.client.inlineResolved(() => {
    return client.client.query[customPostType]({
      id: slug,
      idType: 'SLUG',
    });
  });

  return customPostTypePost === null;
}
