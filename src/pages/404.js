import React from 'react';
import { client } from 'client';
import Head from 'next/head';
import { Footer, Header, Main } from 'components';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>

      <Header title="404: Not Found" />

      <Main className="content">404 Page</Main>

      <Footer />
    </>
  );
}
