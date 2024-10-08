import { getUserFollowing } from '@app/api/fetchers'
import { getServerToken } from '@app/auth'
import { UsersList } from '@app/profile/components/user'
import type { ProfilePageProps } from '@app/profile/types'
import { DefaultSection } from '@app/sections'
import { validateId } from '@app/utils/validators'

export default async function ProfileFollowingPage({
  params,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const token = await getServerToken(userId)
  const { following } = await getUserFollowing(token, { userId })

  return (
    <DefaultSection title="Following">
      <UsersList items={following} />
    </DefaultSection>
  )
}
