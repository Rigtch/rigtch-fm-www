import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'

import { Device, Track } from '@app/api/types'
import {
  useLastTracksQuery,
  usePlaybackStateQuery,
  useTogglePlaybackStateQuery,
} from '@app/api/hooks'

export interface PlaybackStateData {
  device?: Device
  track: Track
}

export interface PlaybackStateContextType {
  data?: PlaybackStateData
  isPlaying: boolean
  toggleState: (isPlaying?: boolean) => Promise<void>
}

export const PlaybackStateContext = createContext<PlaybackStateContextType>({
  isPlaying: false,
  toggleState: () => Promise.resolve(),
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
  const router = useRouter()

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsPlaying(data?.isPlaying ?? false)
  }, [data?.isPlaying])

  useEffect(() => {
    router.refresh()
  }, [data?.track, router])

  const lastTrack = lastTracksQuery.data?.items?.[0]

  async function toggleState() {
    setIsPlaying(!isPlaying)

    const { success } = await toggle(isPlaying)

    if (success) await refetch()
  }

  return (
    <PlaybackStateContext.Provider
      value={{
        data:
          data || lastTrack
            ? ({
                device: data?.device,
                track: data?.track ?? lastTrack,
              } as PlaybackStateData)
            : undefined,
        isPlaying,
        toggleState,
      }}
    >
      {children}
    </PlaybackStateContext.Provider>
  )
}
