import { useQuery } from '@tanstack/react-query'
import { redirect, useParams } from 'next/navigation'

import { getUser } from '../fetchers'
import { USER } from '../constants'

import { validateId } from '@app/utils/validators'
import type { ParamsWithId } from '@app/types'
import { useToken } from '@app/auth/hooks'
import { isPublicUser } from '@app/profile/utils/helpers'

export const useUserQuery = () => {
  const { id } = useParams<ParamsWithId>()
  const token = useToken()

  if (!token && !isPublicUser(id)) redirect('/')

  const userId = validateId(id)

  return useQuery({
    queryKey: [USER, userId],
    queryFn: () => getUser(token ?? '', { userId }),
  })
}
