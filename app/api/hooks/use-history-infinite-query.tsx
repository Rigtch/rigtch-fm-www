import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { getHistory } from '../fetchers'
import { HISTORY } from '../constants'
import { HistoryTrack, Pagination } from '../types'

import { useAuthCookies } from '@app/hooks/use-auth-cookies'
import { USER_ID } from '@app/constants'

export const useHistoryInfiniteQuery = (
  limit = 20,
  initialData: Pagination<HistoryTrack>
) => {
  const { accessToken } = useAuthCookies()
  const params = useParams()
  const userId = params[USER_ID].toString()

  return useInfiniteQuery({
    queryKey: [HISTORY],
    queryFn: ({ pageParam = 1 }) =>
      getHistory(accessToken, {
        userId,
        limit,
        page: pageParam,
      }),
    initialPageParam: 1,
    initialData: () => ({
      pages: [initialData],
      pageParams: [1],
    }),
    getNextPageParam: lastPage =>
      lastPage.meta.currentPage < lastPage.meta.totalPages
        ? lastPage.meta.currentPage + 1
        : undefined,
  })
}
