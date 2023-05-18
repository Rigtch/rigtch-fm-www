import { gql } from '@apollo/client'

export const REFRESH_QUERY = gql`
  query refresh {
    refresh {
      accessToken
    }
  }
`
