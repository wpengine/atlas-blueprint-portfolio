import React from 'react';
import { client } from 'client';
import { Footer, Header, Main, SEO } from 'components';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <SEO
        title={`${generalSettings?.title} - ${generalSettings?.description}`}
      />

      <Header title="404: Not Found" />

      <Main className="content">404 Page</Main>

      <Footer />
    </>
  );
}
