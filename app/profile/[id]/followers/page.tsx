import { getUserFollowers } from '@app/api/fetchers'
import { getServerToken } from '@app/auth'
import { UsersList } from '@app/profile/components/user'
import type { ProfilePageProps } from '@app/profile/types'
import { DefaultSection } from '@app/sections'
import { validateId } from '@app/utils/validators'

export default async function ProfileFollowersPage({
  params,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const token = await getServerToken(userId)
  const { followers } = await getUserFollowers(token, { userId })

  return (
    <DefaultSection title="Followers">
      <UsersList items={followers} />
    </DefaultSection>
  )
}
