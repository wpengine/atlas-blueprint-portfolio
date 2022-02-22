import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, Post } from 'client';
import { GetStaticPropsContext } from 'next';
import { Heading, FeaturedImage, ContentWrapper } from 'components';
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

      <main className="container">
        <ContentWrapper
          title={post?.title()}
          featuredImage={post?.featuredImage?.node?.sourceUrl()}
          content={post?.content()}
        />
      </main>
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