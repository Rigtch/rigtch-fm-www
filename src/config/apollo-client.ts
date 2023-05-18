import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

import { environment } from './environment'

const httpLink = new HttpLink({
  uri: `${environment.API_URL}/graphql`,
  credentials: 'include',
  fetchOptions: {
    credentials: 'include',
  },
})

export const client = new ApolloClient({
  uri: `${environment.API_URL}/graphql`,
  cache: new InMemoryCache(),
  credentials: 'include',
  link: httpLink,
})
