import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, TOP_TRACKS } from '@api/constants'
import { getTopTracks } from '@api/fetchers'

export const useTopTracksQuery = () => {
  const [cookies] = useCookies([ACCESS_TOKEN])

  return useQuery([TOP_TRACKS], () => getTopTracks(cookies[ACCESS_TOKEN]))
}
