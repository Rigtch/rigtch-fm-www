import type { HistoryParams, HistoryTrack, Pagination } from '../types'

import { fetchApi } from './fetch-api'

export function getHistory(
  token: string,
  { userId, limit, page }: HistoryParams
) {
  const searchParams = new URLSearchParams()

  if (limit) searchParams.append('limit', limit + '')
  if (page) searchParams.append('page', page + '')

  return fetchApi<Pagination<HistoryTrack>>(
    `/users/${userId}/history?${searchParams.toString()}`,
    {
      token,
      cache: 'no-cache',
    }
  )
}
