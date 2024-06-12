import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { RECENTLY_PLAYED } from '../constants'
import { getRecentlyPlayed } from '../fetchers'

import { USER_ID } from '@app/constants'
import { useToken } from '@app/hooks/use-token'

export const useRecentlyPlayedQuery = () => {
  const token = useToken()
  const params = useParams()

  const userId = params[USER_ID].toString()

  return useQuery({
    queryKey: [RECENTLY_PLAYED],
    queryFn: () =>
      getRecentlyPlayed(token, {
        userId,
      }),
  })
}
