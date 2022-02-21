import React from 'react';
import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { Pagination, Posts, Heading } from 'components';
import appConfig from 'app.config';

export default function Page() {
  const { query = {} } = useRouter();
  const { postSlug, postCursor } = query;
  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const isBefore = postSlug === 'before';
  const posts = usePosts({
    after: !isBefore ? (postCursor as string) : undefined,
    before: isBefore ? (postCursor as string) : undefined,
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

      <main className="container">
        <Heading className="text-center">Latest Posts</Heading>
        <Posts posts={posts?.nodes} readMoreText={"Read More"} id="posts-list" />
        <Pagination pageInfo={posts?.pageInfo} basePath="/posts"/>
      </main>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}