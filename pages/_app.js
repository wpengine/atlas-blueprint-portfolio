/* eslint-disable import/order */
import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { WordPressBlocksProvider } from '@faustwp/blocks';

import blocks from '../wp-blocks';

import { FaustProvider } from '@faustwp/core';

import 'normalize.css/normalize.css';
import '../styles/main.scss';
import ThemeStyles from 'components/ThemeStyles/ThemeStyles';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <ThemeStyles />
      <FaustProvider pageProps={pageProps}>
      <WordPressBlocksProvider
        config={{
          blocks,
        }}>
          <Component {...pageProps} key={router.asPath} />
        </WordPressBlocksProvider>
      </FaustProvider>
    </>
  );
}
