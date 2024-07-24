import { useInfiniteQuery } from '@tanstack/react-query'
import { redirect, useParams } from 'next/navigation'

import { getHistory } from '../fetchers'
import { HISTORY } from '../constants'
import type { HistoryTrack, Pagination } from '../types'

import { useToken } from '@app/auth/hooks'
import type { ParamsWithId } from '@app/types'

export const useHistoryInfiniteQuery = (
  limit = 20,
  initialData: Pagination<HistoryTrack>
) => {
  const { id: userId } = useParams<ParamsWithId>()

  const token = useToken()

  if (!token) redirect('/')

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
