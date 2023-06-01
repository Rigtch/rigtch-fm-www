import { gql } from '@apollo/client'

export const TOP_GENRES_QUERY = gql`
  query topGenres {
    topGenres {
      genres
    }
  }
`
