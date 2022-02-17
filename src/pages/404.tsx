import React from 'react';
import { client } from 'client';
import Head from "next/head";

export default function Page(): JSX.Element {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>
      <main className="content">
        404 Page
      </main>
    </>
  );
}