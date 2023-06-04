import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useCookies } from 'react-cookie'

import { applyAuthorizationHeader } from '~/common/auth'
import { ACCESS_TOKEN, IS_AUTHORIZED } from '~/common/constants'
import { client } from '~/config'
import { LAST_TRACKS_QUERY } from '~/graphql/queries'
import { LastTracksQuery, Track } from '~/graphql/types'

export interface LastTracksContextType {
  lastTracks: Track[]
  refetchLastTracks: () => void
}

export const LastTracksContext = createContext<LastTracksContextType>({
  lastTracks: [],
  refetchLastTracks: () => {},
})

export interface LastTracksProviderProps {
  children: ReactNode
}

export function LastTracksProvider({ children }: LastTracksProviderProps) {
  const [cookies] = useCookies([ACCESS_TOKEN, IS_AUTHORIZED])
  const [lastTracks, setLastTracks] = useState<Track[]>([])

  const queryLastTracks = useCallback(() => {
    if (cookies[IS_AUTHORIZED])
      client
        .query<LastTracksQuery>({
          query: LAST_TRACKS_QUERY,
          ...applyAuthorizationHeader(cookies[ACCESS_TOKEN]),
        })
        .then(({ data: { lastTracks } }) => setLastTracks(lastTracks))
  }, [cookies, setLastTracks])

  useEffect(() => {
    queryLastTracks()
  }, [queryLastTracks])

  return (
    <LastTracksContext.Provider
      value={{ lastTracks, refetchLastTracks: queryLastTracks }}
    >
      {children}
    </LastTracksContext.Provider>
  )
}
