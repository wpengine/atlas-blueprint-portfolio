import {getNextStaticProps} from '@faustjs/next';
import Head from 'next/head';
import React from 'react';
import {client} from 'client';
import {Posts, Heading} from 'components';
import appConfig from 'app.config';
import usePagination from "hooks/usePagination";

export default function Page() {
  const {useQuery, usePosts} = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: appConfig.postsPerPage,
    where: {
      categoryName: 'uncategorized',
    },
  });
  const {data, fetchMore} = usePagination((query, args) => {
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

  const isLoading = useQuery().$state.isLoading;
  return (
    <>
      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>
      <main className="container">
        <Heading className="text-center">Latest Posts</Heading>
        <Posts posts={data?.nodes} readMoreText={"Read More"} id="posts-list"/>
        {isLoading && <p>Loading...</p>}
        {data?.pageInfo?.hasNextPage && data?.pageInfo?.endCursor ? (
          <button
            disabled={isLoading}
            onClick={() => {
              fetchMore()
            }}
          >
            Load more Posts
          </button>
        ) : null}
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}