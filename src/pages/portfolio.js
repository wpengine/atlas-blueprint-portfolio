import React from 'react';
import Head from 'next/head';
import { client } from 'client';
import appConfig from '../app.config';
import usePagination from 'hooks/usePagination';
import { Header, LoadMore, Projects } from 'components';
import { getNextStaticProps } from '@faustjs/next';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const projects = useQuery().projects({
    first: appConfig.postsPerPage,
  });
  const { data, fetchMore, isLoading } = usePagination(
    (query, args) => {
      const { nodes, pageInfo } = query.projects(args);
      return {
        nodes: Array.from(nodes),
        pageInfo,
      };
    },
    { nodes: projects?.nodes, pageInfo: projects?.pageInfo }
  );

  return (
    <>
      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>
      <Header title="Portfolio"/>
      <main className="container">
        <Projects projects={data.nodes} id="portfolio-list" />
        <LoadMore
          pageInfo={data.pageInfo}
          isLoading={isLoading}
          fetchMore={fetchMore}
          className="text-center"
        />
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
