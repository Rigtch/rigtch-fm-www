import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import '@styles/audio-bars.css'
import '@styles/playback-card.css'
import '@styles/theme.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CookiesProvider } from 'react-cookie'

import { DefaultLayout } from '@layouts'
import { PlaybackStateProvider } from '@context/playback-state'

export interface PageProps {
  dehydratedState?: unknown
}

export default function App({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: AppProps<PageProps>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <Head>
        <title>Rigtch Music</title>

        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#0e1315" />

        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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

      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <CookiesProvider>
            <PlaybackStateProvider>
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            </PlaybackStateProvider>
          </CookiesProvider>
        </Hydrate>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}
