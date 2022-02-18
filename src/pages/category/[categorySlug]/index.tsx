import { getNextStaticProps, is404 } from '@faustjs/next';
import Head from 'next/head';
import { GetStaticPropsContext } from 'next';
import { client } from 'client';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Head>
        <title>Posts - {generalSettings?.title}</title>
      </Head>

      <main className="content content-single" />
    </>
  );
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