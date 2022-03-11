import { getNextStaticProps, is404 } from '@faustjs/next';
import Head from 'next/head';
import Link from 'next/link';
import { client } from 'client';
import { Footer, Header, Main } from 'components';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const categories = useQuery()?.categories();

  if (useQuery().$state.isLoading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>All Categories - {generalSettings?.title}</title>
      </Head>

      <Header title="All Categories" />

      <Main className="container">
        <div className="content">
          <h1>All Categories</h1>
          <ul>
            {categories?.nodes?.map(({ id, name }) => {
              return (
                <li key={id}>
                  {
                    <Link href={`category/${name}`}>
                      <a>{name}</a>
                    </Link>
                  }
                </li>
              );
            })}
          </ul>
        </div>
      </Main>

      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}
