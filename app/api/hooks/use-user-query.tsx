import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { getUser } from '../fetchers'
import { USER } from '../constants'

import { validateId } from '@app/utils/validators'
import type { ParamsWithId } from '@app/types'
import { useToken } from '@app/hooks/use-token'

export const useUserQuery = () => {
  const { id } = useParams<ParamsWithId>()
  const token = useToken()

  const userId = validateId(id)

  return useQuery({
    queryKey: [USER, userId],
    queryFn: () => getUser(token, { userId }),
  })
}
