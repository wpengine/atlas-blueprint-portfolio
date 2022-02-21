import { getNextStaticProps } from '@faustjs/next';
import Head from 'next/head';
import React from 'react';
import { client } from 'client';
import { GetStaticPropsContext } from 'next';
import { Posts, Pagination, Heading } from 'components';
import appConfig from 'app.config';


export default function Page() {
  const {useQuery, usePosts} = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: appConfig.postsPerPage,
    where: {
      categoryName: 'uncategorized',
    },
  });

  return (
    <>
      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>
      <main className="container">
        <Heading className="text-center">Latest Posts</Heading>
        <Posts posts={posts?.nodes} readMoreText={"Read More"} id="posts-list"/>
        <Pagination pageInfo={posts?.pageInfo} basePath="posts"/>
      </main>
    </>
  )

}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}