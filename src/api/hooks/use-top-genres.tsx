import { useQuery } from '@tanstack/react-query'

import { getTopGenres } from '@api/fetchers'
import { TOP_GENRES } from '@api/constants'
import { TimeRange } from '@api/types'
import { useAuthCookies } from '@hooks/use-auth-cookies'

export const useTopGenresQuery = (timeRange = TimeRange.LONG_TERM) => {
  const { accessToken } = useAuthCookies()

  return useQuery([TOP_GENRES], () => getTopGenres(accessToken, timeRange))
}
