import { useQuery } from '@tanstack/react-query'

import { getTopGenres } from '../fetchers'
import { TOP_GENRES } from '../constants'
import { TimeRange } from '../types'

import { useAuthCookies } from '@app/hooks/use-auth-cookies'

export const useTopGenresQuery = (timeRange = TimeRange.LONG_TERM) => {
  const { accessToken } = useAuthCookies()

  return useQuery([TOP_GENRES], () => getTopGenres(accessToken, timeRange))
}
