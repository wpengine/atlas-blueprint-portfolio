import { getNextStaticProps, is404 } from '@faustjs/next';
import { client } from 'client';
import { ContentWrapper, Footer, Header, Main } from 'components';
import Head from 'next/head';

export function PostComponent({ post }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  return (
    <>
      <Head>
        <title>
          {post?.title()} - {generalSettings?.title}
        </title>
      </Head>

      <Header
        title={post?.title()}
        date={post?.date}
        author={post?.author?.node?.name}
        image={post?.featuredImage?.node}
      />

      <Main className="container">
        <ContentWrapper content={post?.content()} />
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
