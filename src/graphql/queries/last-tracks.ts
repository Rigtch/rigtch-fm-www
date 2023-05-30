import { gql } from '@apollo/client'

export const LAST_TRACKS_QUERY = gql`
  query lastTracks {
    lastTracks {
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
      duration
      playedAt
    }
  }
`
