import { gql } from '@apollo/client'

export const TOP_ARTISTS_QUERY = gql`
  query topArtists {
    topArtists {
      name
      genres
      href
      images {
        url
      }
    }
  }
`
