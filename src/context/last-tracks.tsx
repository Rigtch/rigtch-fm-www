import { ReactNode, createContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { applyAuthorizationHeader } from '~/common/auth'
import { ACCESS_TOKEN } from '~/common/constants'
import { client } from '~/config'
import { LAST_TRACKS_QUERY } from '~/graphql/queries'
import { LastTracksQuery, Track } from '~/graphql/types'
import { useAuth } from '~/hooks/auth'

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
  const { isAuthorized } = useAuth()

  const [cookies] = useCookies([ACCESS_TOKEN])
  const [lastTracks, setLastTracks] = useState<Track[]>([])

  function queryLastTracks() {
    if (isAuthorized)
      client
        .query<LastTracksQuery>({
          query: LAST_TRACKS_QUERY,
          ...applyAuthorizationHeader(cookies[ACCESS_TOKEN]),
        })
        .then(({ data: { lastTracks } }) => setLastTracks(lastTracks))
  }

  useEffect(() => {
    queryLastTracks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LastTracksContext.Provider
      value={{ lastTracks, refetchLastTracks: queryLastTracks }}
    >
      {children}
    </LastTracksContext.Provider>
  )
}
