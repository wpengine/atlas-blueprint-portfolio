import React from 'react';
import { client } from 'client';
import { Footer, Header, LoadMore, Main, Projects, SEO } from 'components';
import { getNextStaticProps } from '@faustjs/next';
import { pageTitle } from 'utils';
import usePostPagination, {
  defaultProjectPrepassItems,
} from 'hooks/usePostPagination';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const { data, fetchMore, isLoading } = usePostPagination(
    (query, queryArgs) => query.projects(queryArgs),
    defaultProjectPrepassItems
  );

  return (
    <>
      <SEO title={pageTitle(generalSettings, 'Portfolio')} />

      <Header title="Portfolio" />

      <Main className="container">
        <Projects projects={data?.nodes} id="portfolio-list" />
        <LoadMore
          hasNextPage={data?.hasNextPage}
          endCursor={data?.endCursor}
          isLoading={isLoading}
          fetchMore={fetchMore}
          className="text-center"
        />
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
