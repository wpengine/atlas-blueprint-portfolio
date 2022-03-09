import { client } from '../client';
import appConfig from '../app.config';
import usePagination from 'hooks/usePagination';
import Head from 'next/head';
import { Heading, LoadMore, Projects } from '../components';
import { getNextStaticProps } from '@faustjs/next';
import React from 'react';

export default function Page() {
  const {useQuery} = client;
  const generalSettings = useQuery().generalSettings;
  const projects = useQuery().projects({
    first: appConfig.postsPerPage
  });
  const {data, fetchMore, isLoading} = usePagination((query, args) => {
    const {
      nodes,
      pageInfo,
    } = query.projects(args);
    return {
      nodes: Array.from(nodes),
      pageInfo
    };
  }, {nodes: projects?.nodes, pageInfo: projects?.pageInfo});

  return (
    <>
      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>
      <main className="container">
        <Heading className="text-center">Portfolio</Heading>
        <Projects projects={data.nodes} id="portfolio-list" />
        <LoadMore pageInfo={data.pageInfo} isLoading={isLoading} fetchMore={fetchMore}/>
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
