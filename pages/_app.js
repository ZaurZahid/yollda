import Head from 'next/head';

import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>AllVer</title>
      <meta name="description" content="Default app description." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default appWithTranslation(MyApp)