import { getNextStaticProps } from "@faustjs/next";
import Head from "next/head";
import React from "react";
import { client } from "client";
import { Posts, Pagination, Heading } from "components";
import appConfig from "app.config";
import CTA from "components/CTA/CTA";
import Button from "components/Button/Button";
import { FaArrowRight } from "react-icons/fa";

export default function Page() {
  const { useQuery, usePosts } = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: appConfig.postsPerPage,
    where: {
      categoryName: "uncategorized",
    },
  });

  return (
    <>
      <Head>
        <title>
          {generalSettings?.title} - {generalSettings?.description}
        </title>
      </Head>

      <main className="container">
        <CTA
          Button={() => (
            <Button href="/posts">
              Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
            </Button>
          )}
        >
          Learn about Core Web Vitals and how Atlas can help you reach your most
          demanding speed and user experience requirements.
        </CTA>
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
