import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'

import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import '~/styles/theme.css'

import { client } from '~/config'
import { DefaultLayout } from '~/layouts'
import { AuthProvider } from '~/context/auth'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </AuthProvider>
    </ApolloProvider>
  )
}
