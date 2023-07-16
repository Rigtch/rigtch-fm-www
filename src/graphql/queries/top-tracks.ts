import { gql } from '@apollo/client'

export const TOP_TRACKS_QUERY = gql`
  query topTracks {
    topTracks {
      name
      href
      artists {
        name
        href
      }
      album {
        name
        images {
          url
        }
      }
    }
  }
`
