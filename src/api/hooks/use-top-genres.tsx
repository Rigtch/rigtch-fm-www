import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { getTopGenres } from '@api/fetchers'
import { ACCESS_TOKEN, TOP_GENRES } from '@api/constants'
import { TimeRange } from '@api/types'

export const useTopGenresQuery = (timeRange = TimeRange.LONG_TERM) => {
  const [cookie] = useCookies([ACCESS_TOKEN])

  return useQuery([TOP_GENRES], () =>
    getTopGenres(cookie[ACCESS_TOKEN], timeRange)
  )
}
