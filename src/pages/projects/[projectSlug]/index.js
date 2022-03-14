import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import { Header, Footer, ProjectHeader, ContentWrapper, Main } from 'components';
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

export default function Page({id}) {
  const { useQuery } = client;
  const project = useQuery().project({
    id,
    idType: 'SLUG'
  });

  return <ProjectComponent project={project} />;
}

export async function getStaticProps(context) {
  const { projectSlug } = context?.params;
  return getNextStaticProps(context, {
    Page,
    client,
    props: {
      id: projectSlug
    }
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
