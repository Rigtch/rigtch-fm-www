import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'

import 'antd/dist/reset.css'
import 'windi.css'
import 'windi-devtools'

import { client } from '~/config'
import { DefaultLayout } from '~/layouts'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ConfigProvider>
    </ApolloProvider>
  )
}
