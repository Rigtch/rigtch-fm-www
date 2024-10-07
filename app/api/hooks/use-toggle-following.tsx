import { useParams, useRouter } from 'next/navigation'

import { revalidateUser } from '../actions'
import { putFollowUser, putUnFollowUser } from '../fetchers'

import { useAuthCookies, useToken } from '@app/auth/hooks'
import type { ParamsWithId } from '@app/types'

export const useToggleFollowing = () => {
  const { id: userId } = useParams<ParamsWithId>()
  const { userId: followerId } = useAuthCookies()
  const token = useToken()
  const router = useRouter()

  async function toggle(isFollowing = false) {
    const response = await (isFollowing
      ? putUnFollowUser(token ?? '', { userId, followerId })
      : putFollowUser(token ?? '', { userId, followerId }))

    await revalidateUser()
    router.refresh()

    return response
  }

  return {
    toggle: token ? toggle : () => false,
  }
}
