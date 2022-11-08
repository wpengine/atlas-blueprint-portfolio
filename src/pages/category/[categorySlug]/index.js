import React from 'react';
import { getNextStaticProps, is404 } from '@faustjs/next';
import { useRouter } from 'next/router';
import { client } from 'client';
import {
  Posts,
  LoadMore,
  Footer,
  Main,
  EntryHeader,
  Header,
  SEO,
} from 'components';
import { pageTitle } from 'utils';
import useNodePagination from 'hooks/useNodePagination';

export default function Page() {
  const { useQuery, useCategory } = client;
  const { query = {} } = useRouter();
  const { categorySlug } = query;
  const generalSettings = useQuery().generalSettings;
  const category = useCategory();

  const { data, fetchMore, isLoading } = useNodePagination(
    (query, queryArgs) => {
      return query.posts({
        ...queryArgs,
        where: { categoryName: categorySlug },
      });
    }
  );

  return (
    <>
      <SEO
        title={pageTitle(generalSettings, 'Posts', generalSettings?.title)}
      />

      <Header />

      <Main>
        <EntryHeader title={`Category: ${category?.name}`} />
        <div className="container">
          <Posts posts={data?.nodes} />
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
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
