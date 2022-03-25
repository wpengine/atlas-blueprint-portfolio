import { getNextStaticProps, is404 } from '@faustjs/next';
import Link from 'next/link';
import { client } from 'client';
import { Footer, Header, EntryHeader, Main, SEO } from 'components';
import { pageTitle } from 'utils';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const categories = useQuery()?.categories();

  if (useQuery().$state.isLoading) {
    return null;
  }

  return (
    <>
      <SEO
        title={pageTitle(
          generalSettings,
          'All Categories',
          generalSettings?.title
        )}
      />

      <Header />

      <Main>
        <EntryHeader title="All Categories" />
        <div className="container">
          <div className="content">
            <h1>All Categories</h1>
            <ul>
              {categories?.nodes?.map(({ id, name, uri }) => {
                return (
                  <li key={id}>
                    {
                      <Link href={uri ?? '#'}>
                        <a>{name}</a>
                      </Link>
                    }
                  </li>
                );
              })}
            </ul>
          </div>
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
