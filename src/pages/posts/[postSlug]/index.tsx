import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, Post } from 'client';
import { GetStaticPropsContext } from 'next';
import { Heading, FeaturedImage } from 'components';
import Head from 'next/head';

export interface PostProps {
  post: Post | Post['preview']['node'] | null | undefined;
}

export function PostComponent({ post }: PostProps) {
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
        <article className="content">
          <Heading className="text-center" level="h2">{post?.title()}</Heading>
          <FeaturedImage image={post?.featuredImage?.node?.sourceUrl()}/>
          <div dangerouslySetInnerHTML={{ __html: post?.content() ?? '' }} />
        </article>
      </main>
    </>
  );
}

export default function Page() {
  const { usePost } = client;
  const post = usePost();

  return <PostComponent post={post} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
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