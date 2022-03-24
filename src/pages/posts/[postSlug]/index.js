import { getNextStaticProps, is404 } from '@faustjs/next';
import { client } from 'client';
import {
  ContentWrapper,
  Footer,
  Header,
  EntryHeader,
  Main,
  SEO,
  TaxonomyTerms,
} from 'components';
import { pageTitle } from 'utils';

export function PostComponent({ post }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <SEO
        title={pageTitle(
          generalSettings,
          post?.title(),
          generalSettings?.title
        )}
        imageUrl={post?.featuredImage?.node?.sourceUrl?.()}
      />

      <Header />

      <Main>
        <EntryHeader
          title={post?.title()}
          date={post?.date}
          author={post?.author?.node?.name}
          image={post?.featuredImage?.node}
        />
        <div className="container">
          <ContentWrapper content={post?.content()}>
            <TaxonomyTerms post={post} taxonomy={'categories'} />
            <TaxonomyTerms post={post} taxonomy={'tags'} />
          </ContentWrapper>
        </div>
      </Main>

      <Footer />
    </>
  );
}

export default function Page() {
  const { usePost } = client;
  const post = usePost();

  return <PostComponent post={post} />;
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
