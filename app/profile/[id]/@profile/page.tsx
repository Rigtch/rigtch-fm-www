import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import { getUser, getUserFollowers } from '@app/api/fetchers'
import { getServerToken } from '@app/auth/utils'
import { Playback } from '@app/profile/components/playback'
import { ProfileCard } from '@app/profile/components/profile'
import type { ProfilePageProps } from '@app/profile/types'
import { validateId } from '@app/utils/validators'
import { USER_ID } from '@app/constants'

export const runtime = 'edge'

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const userId = validateId(params.id)
  const token = await getServerToken(userId)

  const {
    profile: { displayName },
  } = await getUser(token, { userId })

  return {
    title: displayName,
  }
}

export default async function ProfileSubPage({ params }: ProfilePageProps) {
  const userId = validateId(params.id)
  const token = await getServerToken(userId)

  const [{ profile, followersCount, followingCount, id }, { followers }] =
    await Promise.all([
      getUser(token, {
        userId,
      }),
      getUserFollowers(token, { userId }),
    ])
  const currentUserId = validateId(cookies().get(USER_ID)?.value)
  const isFollowingUser = followers.some(({ id }) => id === currentUserId)

  return (
    <ProfileCard
      {...profile}
      id={id}
      isFollowingUser={isFollowingUser}
      currentUserId={currentUserId}
      followersCount={followersCount}
      followingCount={followingCount}
    >
      <Playback />
    </ProfileCard>
  )
}
