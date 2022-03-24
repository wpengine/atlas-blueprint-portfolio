import React from 'react';
import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import {
  Posts,
  Header,
  LoadMore,
  EntryHeader,
  Footer,
  Main,
  SEO,
} from 'components';
import usePagination from 'hooks/usePagination';
import appConfig from 'app.config';
import { pageTitle } from 'utils';

export default function Page() {
  const { useQuery, usePosts } = client;
  const posts = usePosts({
    first: appConfig.postsPerPage,
  });
  const generalSettings = useQuery().generalSettings;
  const { data, fetchMore, isLoading } = usePagination(
    (query, args) => {
      const { nodes, pageInfo } = query.posts(args);
      return {
        nodes: Array.from(nodes),
        pageInfo,
      };
    },
    { nodes: posts?.nodes, pageInfo: posts?.pageInfo }
  );

  return (
    <>
      <SEO title={pageTitle(generalSettings)} />

      <Header />

      <Main>
        <EntryHeader title="Latest Posts" />
        <div className="container">
          <Posts posts={data?.nodes} readMoreText="Read More" id="posts-list" />
          <LoadMore
            className="text-center"
            pageInfo={data.pageInfo}
            isLoading={isLoading}
            fetchMore={fetchMore}
          />
        </div>
      </Main>

      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
