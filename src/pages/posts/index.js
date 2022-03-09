import React from 'react';
import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Pagination, Posts, Header } from 'components';
import appConfig from 'app.config';

export default function Page() {
  const { query = {} } = useRouter();
  const { postSlug, postCursor } = query;
  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const isBefore = postSlug === 'before';
  const posts = usePosts({
    after: !isBefore ? postCursor : undefined,
    before: isBefore ? postCursor : undefined,
    first: !isBefore ? appConfig.postsPerPage : undefined,
    last: isBefore ? appConfig.postsPerPage : undefined,
  });

  if (useQuery().$state.isLoading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          All Posts - {generalSettings?.description}
        </title>
      </Head>

      <Header
        title="Latest Posts"
      />

      <main className="container">
        <Posts posts={posts?.nodes} readMoreText={"Read More"} id="posts-list" />
        <Pagination pageInfo={posts?.pageInfo} basePath="/posts"/>
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}