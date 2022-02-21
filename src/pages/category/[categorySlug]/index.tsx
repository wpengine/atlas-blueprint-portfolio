import { getNextStaticProps, is404 } from '@faustjs/next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';
import { client } from 'client';
import { Pagination, Posts, Heading } from 'components';
import appConfig from 'app.config';

export default function Page() {
  const { useQuery, usePosts, useCategory } = client;
  const { query = {} } = useRouter();
  const { categorySlug, paginationTerm, categoryCursor } = query;
  const generalSettings = useQuery().generalSettings;
  const category = useCategory();
  const isBefore = paginationTerm === 'before';
  const posts = usePosts({
    after: !isBefore ? (categoryCursor as string) : undefined,
    before: isBefore ? (categoryCursor as string) : undefined,
    first: !isBefore ? appConfig.postsPerPage : undefined,
    last: isBefore ? appConfig.postsPerPage : undefined,
  });

  return (
    <>
      <Head>
        <title>Posts - {generalSettings?.title}</title>
      </Head>

      <main className="container">
        <Heading level="h2">Category: {category?.name}</Heading>
        <Posts posts={posts.nodes} />
        <Pagination
          pageInfo={posts.pageInfo}
          basePath={`/category/${categorySlug}`}
        />
      </main>
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