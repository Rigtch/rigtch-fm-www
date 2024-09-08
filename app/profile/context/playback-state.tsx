import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'

import type { Device, Track } from '@app/api/types'
import {
  useRecentlyPlayedQuery,
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

export type PlaybackStateProviderProps = Readonly<{
  children: ReactNode
}>

export function PlaybackStateProvider({
  children,
}: PlaybackStateProviderProps) {
  const { data, refetch } = usePlaybackStateQuery()
  const lastTracksQuery = useRecentlyPlayedQuery()
  const { toggle } = useTogglePlaybackStateQuery()
  const router = useRouter()

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsPlaying(data?.isPlaying ?? false)
  }, [data?.isPlaying])

  useEffect(() => {
    router.refresh()
  }, [data?.track, router])

  const lastTrack = lastTracksQuery.data?.items[0]

  const value = useMemo(
    () => ({
      data:
        (data ?? lastTrack)
          ? ({
              device: data?.device,
              track: data?.track ?? lastTrack,
            } as PlaybackStateData)
          : undefined,
      isPlaying,
      toggleState: async () => {
        const { success } = await toggle(isPlaying)

        setIsPlaying(!isPlaying)

        if (success) await refetch()
      },
    }),
    [data, isPlaying, lastTrack, toggle, refetch]
  )

  return (
    <PlaybackStateContext.Provider value={value}>
      {children}
    </PlaybackStateContext.Provider>
  )
}
