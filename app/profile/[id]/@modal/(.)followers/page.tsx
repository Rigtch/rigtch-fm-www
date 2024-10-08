import { FollowersFollowingDialog } from '../components'

import type { ProfilePageProps } from '@app/profile/types'
import { getUserFollowers } from '@app/api/fetchers'
import { getServerToken } from '@app/auth'
import { validateId } from '@app/utils/validators'

export default async function ProfileFollowersPage({
  params,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const token = await getServerToken(userId)
  const { followers } = await getUserFollowers(token, { userId })

  return <FollowersFollowingDialog desiredRoute="followers" items={followers} />
}
