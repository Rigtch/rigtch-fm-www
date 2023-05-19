import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'

import 'antd/dist/reset.css'

import { client, defaultTheme } from '~/config'
import { DefaultLayout } from '~/layouts'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <DefaultLayout>
        <ConfigProvider theme={defaultTheme}>
          <Component {...pageProps} />
        </ConfigProvider>
      </DefaultLayout>
    </ApolloProvider>
  )
}
