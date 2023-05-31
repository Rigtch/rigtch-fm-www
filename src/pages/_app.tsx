import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import '~/styles/audio-bars.css'
import '~/styles/theme.css'

import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { client } from '~/config'
import { DefaultLayout } from '~/layouts'
import { AuthProvider } from '~/context/auth'
import { PlaybackStateProvider } from '~/context/playback-state'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rigtch Music</title>

        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#0e1315" />

        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/aple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9400d5" />
      </Head>

      <ApolloProvider client={client}>
        <AuthProvider>
          <PlaybackStateProvider>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </PlaybackStateProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  )
}
