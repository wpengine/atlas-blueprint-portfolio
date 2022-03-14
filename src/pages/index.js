import { getNextStaticProps } from '@faustjs/next';
import Head from 'next/head';
import React from 'react';
import { client } from 'client';
import { FaArrowRight } from 'react-icons/fa';
import {
  Posts,
  Header,
  LoadMore,
  Footer,
  Main,
  Button,
  Heading,
  CTA,
  Testimonials,
} from 'components';
import appConfig from 'app.config';
import usePagination from 'hooks/usePagination';

export default function Page() {
  const { useQuery, usePosts } = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: appConfig.homePagePostsCount,
    where: {
      categoryName: 'uncategorized',
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
  const testimonials = useQuery().testimonials();

  return (
    <>
      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>
      <Header title="Home Page" />

      <Main className="container">
        <section style={{ padding: '0 3rem' }}>
          <CTA
            Button={() => (
              <Button href="#">
                Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
              </Button>
            )}
          >
            <span>
              Learn about Core Web Vitals and how Atlas can help you reach your
              most demanding speed and user experience requirements.
            </span>
          </CTA>
        </section>
        <section>
          <Heading className="text-center" level="h2">
            Latest Posts
          </Heading>
          <Posts
            posts={posts?.nodes}
            readMoreText={'Read More'}
            id="posts-list"
          />
        </section>
        <section style={{ padding: '0 3rem' }}>
          <CTA
            Button={() => (
              <Button href="#">
                Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
              </Button>
            )}
          >
            <span>
              Learn about Core Web Vitals and how Atlas can help you reach your
              most demanding speed and user experience requirements.
            </span>
          </CTA>
        </section>
        <section className="text-center" style={{ padding: '0 3rem' }}>
          <Heading level="h2">Testimonials</Heading>
          <Heading level="h6" className="font-weight-normal">
            Here are just a few of the nice things our customers have to say.
          </Heading>
          <Testimonials testimonials={testimonials?.nodes} />
        </section>
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
