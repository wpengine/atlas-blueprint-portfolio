import React from 'react';
import { client } from 'client';
import {
  Footer,
  Header,
  EntryHeader,
  LoadMore,
  Main,
  Projects,
  SEO,
} from 'components';
import { getNextStaticProps } from '@faustjs/next';
import { pageTitle } from 'utils';
import useNodePagination from 'hooks/useNodePagination';

/**
 * Prepass fields for project nodes. This lists all the pieces of data we need
 * for each project node. Running the following through `prepass` ensures that
 * all of the data is there when we need it, and no cascading requests happen.
 *
 * @see https://gqty.dev/docs/client/helper-functions#prepass
 */
const PROJECT_NODES_PREPASS_FIELDS = [
  'databaseId',
  'id',
  '__typename',
  'featuredImage.*',
  'featuredImage.node.altText',
  'featuredImage.node.mediaDetails.width',
  'featuredImage.node.mediaDetails.height',
  'featuredImage.node.sourceUrl',
  'author.node.name',
  'date',
  'uri',
  'title',
  'slug',
  'summary',
];

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const { data, fetchMore, isLoading } = useNodePagination(
    (query, queryArgs) => query.projects(queryArgs),
    PROJECT_NODES_PREPASS_FIELDS
  );

  return (
    <>
      <SEO title={pageTitle(generalSettings, 'Portfolio')} />

      <Header />

      <Main>
        <EntryHeader title="Portfolio" />
        <div className="container">
          <Projects projects={data?.nodes} id="portfolio-list" />
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
