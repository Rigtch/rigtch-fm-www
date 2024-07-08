import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { getHistory } from '../fetchers'
import { HISTORY } from '../constants'
import type { HistoryTrack, Pagination } from '../types'

import { ID } from '@app/constants'
import { useToken } from '@app/hooks/use-token'

export const useHistoryInfiniteQuery = (
  limit = 20,
  initialData: Pagination<HistoryTrack>
) => {
  const params = useParams()
  const userId = params[ID].toString()
  const token = useToken()

  return useInfiniteQuery({
    queryKey: [HISTORY],
    queryFn: ({ pageParam = 1 }) =>
      getHistory(token, {
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
