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

export interface PlaybackContextStateType {
  device?: Device
  isPlaying: boolean
  track?: Track
  setPlaybackState: (newState: PlaybackStateDto) => void
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}

export const PlaybackStateContext = createContext<PlaybackContextStateType>({
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

  const [cookies] = useCookies([ACCESS_TOKEN])
  const [isPlaying, setIsPlaying] = useState(false)
  const [device, setDevice] = useState<Device>()
  const [track, setTrack] = useState<Track>()

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthorized)
        client
          .query({
            query: CURRENT_PLAYBACK_STATE_QUERY,
            ...applyAuthorizationHeader(cookies[ACCESS_TOKEN]),
          })
          .then(({ data: { currentPlaybackState } }) =>
            setPlaybackState(currentPlaybackState)
          )
          .catch(() => {})
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
