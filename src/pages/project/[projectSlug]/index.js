import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import {
  Header,
  EntryHeader,
  Footer,
  ProjectHeader,
  ContentWrapper,
  Main,
  SEO,
} from 'components';
import { is404Cpt } from 'utils';

export function ProjectComponent({ project }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <SEO
        title={`${project?.title()} - ${generalSettings?.title}`}
        imageUrl={project?.featuredImage?.node?.sourceUrl?.()}
      />

      <Header />

      <Main>
        <EntryHeader title={project?.title()} />
        <ProjectHeader
          image={project?.featuredImage?.node}
          summary={project?.summary}
          title={project?.title()}
        />
        <div className="container">
          <ContentWrapper content={project?.contentArea} />
        </div>
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
  const projectSlug = context?.params?.projectSlug;

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
