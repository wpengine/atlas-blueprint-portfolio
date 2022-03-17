import { getNextStaticProps } from '@faustjs/next';
import Head from 'next/head';
import React from 'react';
import { client } from 'client';
import { FaArrowRight } from 'react-icons/fa';
import {
  Posts,
  Header,
  Footer,
  Main,
  Button,
  Heading,
  CTA,
  Testimonials,
} from 'components';
import styles from 'styles/pages/_Home.module.scss';

const postsPerPage = 3;

export default function Page() {
  const { useQuery, usePosts } = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: postsPerPage,
    where: {
      categoryName: 'uncategorized',
    },
  });
  const testimonials = useQuery().testimonials();
  const mainBanner = {
    sourceUrl: '/static/banner.jpeg',
    mediaDetails: { width: 1200, height: 600 },
    altText: 'Portfolio Banner',
  };

  return (
    <>
      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>
      <Header image={mainBanner} />

      <Main className={[styles.home, 'container'].join(' ')}>
        <section className="hero text-center">
          <Heading className={styles.heading} level="h1">
            Welcome to your Blueprint
          </Heading>
          <p className={styles.description}>
            Achieve unprecedented performance with modern frameworks and the
            world's #1 open source CMS in one powerful headless platform.{' '}
          </p>
          <div className={styles.actions}>
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
          <p>
            Here are just a few of the nice things our customers have to say.
          </p>
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
