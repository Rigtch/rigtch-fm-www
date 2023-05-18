import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

import { API_URL } from './config'

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: 'include',
  fetchOptions: {
    credentials: 'include',
  },
})

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
  credentials: 'include',
  link: httpLink,
})

export default client
