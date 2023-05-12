import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

import { API_URL } from './config'

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: 'include',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})

export default client
