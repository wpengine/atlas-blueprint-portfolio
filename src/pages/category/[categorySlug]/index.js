import { getNextStaticProps, is404 } from '@faustjs/next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { client } from 'client';
import { Posts, Heading } from 'components';
import appConfig from 'app.config';
import usePagination from "../../../hooks/usePagination";
import React from "react";

export default function Page() {
  const { useQuery, usePosts, useCategory } = client;
  const { query = {} } = useRouter();
  const { categorySlug } = query;
  const generalSettings = useQuery().generalSettings;
  const category = useCategory();
  const posts = usePosts({
    first: appConfig.postsPerPage,
    where: {
      categoryName: categorySlug,
    },
  });

  const {data, fetchMore, isLoading} = usePagination((query, args) => {
    const {
      nodes,
      pageInfo: { hasNextPage, endCursor },
    } = query.posts(args);
    return {
      nodes: Array.from(nodes),
      hasNextPage,
      endCursor,
    };
  }, {nodes: posts?.nodes, pageInfo: posts?.pageInfo});
  return (
    <>
      <Head>
        <title>Posts - {generalSettings?.title}</title>
      </Head>

      <main className="container">
        <Heading level="h2">Category: {category?.name}</Heading>
        <Posts posts={data.nodes} />
        {isLoading && <p>Loading...</p>}
        {data?.pageInfo?.hasNextPage && data?.pageInfo?.endCursor ? (
          <button
            disabled={isLoading}
            onClick={() => fetchMore()}
          >
            Load more Posts
          </button>
        ) : null}
      </main>
    </>
  );
}

export async function getStaticProps(context) {
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