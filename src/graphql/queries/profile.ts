import { gql } from '@apollo/client'

export const PROFILE_QUERY = gql`
  query profile {
    profile {
      displayName
      images {
        url
      }
      href
    }
  }
`
