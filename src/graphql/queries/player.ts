import { gql } from '@apollo/client'

export const RESUME_PLAYER_QUERY = gql`
  query resumePlayer {
    resumePlayer {
      success
    }
  }
`

export const PAUSE_PLAYER_QUERY = gql`
  query pausePlayer {
    pausePlayer {
      success
    }
  }
`
