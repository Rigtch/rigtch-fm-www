import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { environment } from './environment'

const httpLink = new HttpLink({
  uri: `${environment.API_URL}/graphql`,
  credentials: 'include',
  fetchOptions: {
    credentials: 'include',
    fetchPolicy: 'no-cache',
  },
})

const headersLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'Cache-Control': 'no-cache',
  },
}))

export const client = new ApolloClient({
  uri: `${environment.API_URL}/graphql`,
  cache: new InMemoryCache(),
  credentials: 'include',
  link: headersLink.concat(httpLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})
