import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { RECENTLY_PLAYED } from '../constants'
import { getRecentlyPlayed } from '../fetchers'

import { useToken } from '@app/hooks/use-token'
import type { ParamsWithId } from '@app/types'

export const useRecentlyPlayedQuery = () => {
  const token = useToken()
  const { id: userId } = useParams<ParamsWithId>()

  return useQuery({
    queryKey: [RECENTLY_PLAYED],
    queryFn: () =>
      getRecentlyPlayed(token, {
        userId,
      }),
  })
}
