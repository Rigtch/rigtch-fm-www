import { FollowersFollowingDialog } from '../components'

import type { ProfilePageProps } from '@app/profile/types'
import { getUserFollowing } from '@app/api/fetchers'
import { getServerToken } from '@app/auth'
import { validateId } from '@app/utils/validators'

export default async function ProfileFollowingPage({
  params,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const token = await getServerToken(userId)
  const { following } = await getUserFollowing(token, { userId })

  return <FollowersFollowingDialog desiredRoute="following" items={following} />
}
