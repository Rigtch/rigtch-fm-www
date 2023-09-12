import { ReactNode, createContext, useContext } from 'react'

import { Album, Device, Success, Track } from '@api/types'
import {
  useLastTracksQuery,
  usePlaybackStateQuery,
  useTogglePlaybackStateQuery,
} from '@hooks/api'

export interface PlaybackStateData {
  device?: Device
  track: Track
  album: Album
  albumImage: string
}

export interface PlaybackStateContextType {
  data?: PlaybackStateData
  isPlaying: boolean
  toggleState: (isPlaying?: boolean) => Promise<Success>
}

export const PlaybackStateContext = createContext<PlaybackStateContextType>({
  isPlaying: false,
  toggleState: () => Promise.resolve({ success: false }),
})

export const usePlaybackStateContext = () => useContext(PlaybackStateContext)

export interface PlaybackStateProviderProps {
  children: ReactNode
}

export function PlaybackStateProvider({
  children,
}: PlaybackStateProviderProps) {
  const { data, refetch } = usePlaybackStateQuery()
  const lastTracksQuery = useLastTracksQuery()
  const { toggle } = useTogglePlaybackStateQuery()

  const lastTrack = lastTracksQuery.data?.items?.[0]

  async function toggleState() {
    const response = await toggle(data?.isPlaying)

    if (response.success) await refetch()

    return response
  }

  return (
    <PlaybackStateContext.Provider
      value={{
        data:
          data || lastTrack
            ? ({
                device: data?.device,
                track: data?.track ?? lastTrack,
                album: data?.track?.album ?? lastTrack?.album,
                albumImage:
                  data?.track?.album?.images?.[0]?.url ??
                  lastTrack?.album?.images?.[0]?.url,
              } as PlaybackStateData)
            : undefined,
        isPlaying: data?.isPlaying ?? false,
        toggleState,
      }}
    >
      {children}
    </PlaybackStateContext.Provider>
  )
}
