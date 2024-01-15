import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { RECENTLY_PLAYED } from '../constants'
import { getRecentlyPlayed } from '../fetchers'

import { useAuthCookies } from '@app/hooks/use-auth-cookies'
import { USER_ID } from '@app/constants'

export const useRecentlyPlayedQuery = () => {
  const { accessToken } = useAuthCookies()
  const params = useParams()

  const userId = params[USER_ID].toString()

  return useQuery({
    queryKey: [RECENTLY_PLAYED],
    queryFn: () =>
      getRecentlyPlayed(accessToken, {
        userId,
      }),
  })
}
