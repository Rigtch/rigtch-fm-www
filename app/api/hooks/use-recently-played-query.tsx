import { useQuery } from '@tanstack/react-query'
import { redirect, useParams } from 'next/navigation'

import { RECENTLY_PLAYED } from '../constants'
import { getRecentlyPlayed } from '../fetchers'

import { useToken } from '@app/auth/hooks'
import type { ParamsWithId } from '@app/types'
import { isPublicUser } from '@app/profile/utils/helpers'

export const useRecentlyPlayedQuery = () => {
  const { id: userId } = useParams<ParamsWithId>()
  const token = useToken()

  if (!token && !isPublicUser(userId)) redirect('/')

  return useQuery({
    queryKey: [RECENTLY_PLAYED],
    queryFn: () =>
      getRecentlyPlayed(token ?? '', {
        userId,
      }),
  })
}
