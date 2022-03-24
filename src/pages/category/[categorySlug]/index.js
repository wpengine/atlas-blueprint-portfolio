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
import appConfig from 'app.config';
import usePagination from 'hooks/usePagination';
import { pageTitle } from 'utils';

export default function Page() {
  const { useQuery, usePosts, useCategory } = client;
  const { query = {} } = useRouter();
  const { categorySlug } = query;
  const generalSettings = useQuery().generalSettings;
  const category = useCategory();
  const posts = usePosts({
    first: appConfig.postsPerPage,
    where: {
      categoryName: categorySlug,
    },
  });

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
      <SEO
        title={pageTitle(generalSettings, 'Posts', generalSettings?.title)}
      />

      <Header />

      <Main>
        <EntryHeader title={`Category: ${category?.name}`} />
        <div className="container">
          <Posts posts={data.nodes} />
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
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
