import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'
import { useCookies } from 'react-cookie'

import { applyAuthorizationHeader } from '~/common/auth'
import { ACCESS_TOKEN } from '~/common/constants'
import { client } from '~/config'
import { CURRENT_PLAYBACK_STATE_QUERY } from '~/graphql/queries'
import { Device, Track, PlaybackStateDto } from '~/graphql/types'
import { useAuth } from '~/hooks/auth'
import { useLastTracks } from '~/hooks/last-tracks'

export interface PlaybackStateContextType {
  device?: Device
  isPlaying: boolean
  track?: Track
  setPlaybackState: (newState: PlaybackStateDto) => void
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}

export const PlaybackStateContext = createContext<PlaybackStateContextType>({
  isPlaying: false,
  setPlaybackState: () => {},
  setIsPlaying: () => {},
})

export interface PlaybackStateProviderProps {
  children: ReactNode
}

export function PlaybackStateProvider({
  children,
}: PlaybackStateProviderProps) {
  const { isAuthorized } = useAuth()
  const { refetchLastTracks } = useLastTracks()

  const [cookies] = useCookies([ACCESS_TOKEN])
  const [isPlaying, setIsPlaying] = useState(false)
  const [device, setDevice] = useState<Device>()
  const [track, setTrack] = useState<Track>()

  function queryPlaybackState() {
    if (isAuthorized)
      client
        .query({
          query: CURRENT_PLAYBACK_STATE_QUERY,
          ...applyAuthorizationHeader(cookies[ACCESS_TOKEN]),
        })
        .then(({ data: { currentPlaybackState } }) => {
          if (currentPlaybackState.track.name !== track?.name) {
            console.log('e')
            refetchLastTracks()
          }

          setPlaybackState(currentPlaybackState)
        })
        .catch(() => {})
  }

  useEffect(() => {
    queryPlaybackState()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      queryPlaybackState()
    }, 1000)

    return () => clearInterval(interval)
  })

  function setPlaybackState({ isPlaying, device, track }: PlaybackStateDto) {
    setIsPlaying(isPlaying)
    setDevice(device)
    setTrack(track)
  }

  return (
    <PlaybackStateContext.Provider
      value={{
        isPlaying,
        device,
        track,
        setPlaybackState,
        setIsPlaying,
      }}
    >
      {children}
    </PlaybackStateContext.Provider>
  )
}
