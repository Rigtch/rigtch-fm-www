import { gql } from '@apollo/client'

export const CURRENT_PLAYBACK_STATE_QUERY = gql`
  query currentPlaybackState {
    currentPlaybackState {
      device {
        name
        volumePercent
        isActive
      }
      repeatState
      shuffleState
      isPlaying
      track {
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
        progress
        playedAt
      }
    }
  }
`
