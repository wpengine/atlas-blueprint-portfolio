import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import Link from 'next/link';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';

export default function Page() {
  const { useQuery, usePosts } = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({});

  if (useQuery().$state.isLoading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          All Posts - {generalSettings?.description}
        </title>
      </Head>

      <main className="content">
        <div className="container">
          <ul>
            {
              posts?.nodes?.map(({ id, title, uri }) => {
                return (<li key={id}>
                  {
                    uri && <Link href={uri}>
                      <a>{title()}</a>
                    </Link>
                  }
                </li>)
              })
            }
          </ul>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}