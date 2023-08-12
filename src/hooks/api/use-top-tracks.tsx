import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, TOP_TRACKS } from '@api/constants'
import { getTopTracks } from '@api/fetchers'
import { TimeRange } from '@api/types'

export const useTopTracksQuery = (timeRange = TimeRange.LONG_TERM) => {
  const [cookies] = useCookies([ACCESS_TOKEN])

  return useQuery([TOP_TRACKS], () =>
    getTopTracks(cookies[ACCESS_TOKEN], timeRange)
  )
}
