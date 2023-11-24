import { useQuery } from '@tanstack/react-query'

import { LAST_TRACKS } from '../constants'
import { getLastTracks } from '../fetchers'

import { useAuthCookies } from '@app/hooks/use-auth-cookies'

export const useLastTracksQuery = () => {
  const { accessToken } = useAuthCookies()

  return useQuery({
    queryKey: [LAST_TRACKS],
    queryFn: () => getLastTracks(accessToken),
  })
}
