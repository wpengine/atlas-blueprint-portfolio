import { getNextStaticProps, is404 } from '@faustjs/next';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { client, Page as PageType } from 'client';
import { Heading, FeaturedImage } from 'components';

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
}

export function PageComponent({ page }: PageProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Head>
        <title>
          {page?.title()} - {generalSettings?.title}
        </title>
      </Head>

      <main className="container">
        <article className="content">
          <Heading className="text-center" level="h2">{page?.title()}</Heading>
          <FeaturedImage image={page?.featuredImage?.node?.sourceUrl()} />
          <div dangerouslySetInnerHTML={{ __html: page?.content() ?? '' }} />
        </article>
      </main>
    </>
  );
}

export default function Page() {
  const { usePage } = client;
  const page = usePage();

  return <PageComponent page={page} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}