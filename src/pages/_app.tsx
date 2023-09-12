// import 'primereact/resources/primereact.min.css'
// import 'primeicons/primeicons.css'
// import 'primeflex/primeflex.css'

import '@styles/global.css'
// import '@styles/theme.css'
// import '@styles/audio-bars.css'
// import '@styles/playback-card.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { useState } from 'react'
import { CookiesProvider } from 'react-cookie'
import { ButtonStyleTypes, ThemeProvider } from '@material-tailwind/react'

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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <CookiesProvider>
            <PlaybackStateProvider>
              <ThemeProvider
                value={{
                  button: {
                    defaultProps: {
                      color: 'deep-purple',
                    },
                  } as ButtonStyleTypes,
                }}
              >
                <DefaultLayout>
                  <Component {...pageProps} />

                  <Analytics />
                </DefaultLayout>
              </ThemeProvider>
            </PlaybackStateProvider>
          </CookiesProvider>
        </Hydrate>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}
