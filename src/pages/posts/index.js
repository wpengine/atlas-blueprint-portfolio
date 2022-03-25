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
import { pageTitle } from 'utils';
import useNodePagination from 'hooks/useNodePagination';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const { data, fetchMore, isLoading } = useNodePagination((query, queryArgs) =>
    query.posts(queryArgs)
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
            hasNextPage={data?.hasNextPage}
            endCursor={data?.endCursor}
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
