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
  const testimonials = useQuery().testimonials();
  const banner = {
    sourceUrl: () => '/static/banner.png',
    mediaDetails: { width: 1200, height: 600 },
  };

  return (
    <>
      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>
      <Header image={banner} />

      <Main className="home container">
        <section className="hero text-center">
          <Heading className="heading" level="h1">
            Welcome to your Blueprint
          </Heading>
          <p className="description">
            Achieve unprecedented performance with modern frameworks and the
            world's #1 open source CMS in one powerful headless platform.{' '}
          </p>
          <div className="actions">
            <Button type="secondary" href="#">
              GET STARTED
            </Button>
            <Button type="primary" href="#">
              LEARN MORE
            </Button>
          </div>
        </section>
        <section className="cta">
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
        <section className="posts">
          <Heading className="text-center" level="h2">
            Latest Posts
          </Heading>
          <Posts
            posts={posts?.nodes}
            readMoreText={'Read More'}
            id="posts-list"
          />
        </section>
        <section className="cta">
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
        <section className="testimonials text-center">
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
