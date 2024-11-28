import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import { getUser, getUserFollowers, getUserFollowing } from '@app/api/fetchers'
import { getServerToken } from '@app/auth/utils'
import { Playback } from '@app/profile/components/playback'
import { ProfileCard } from '@app/profile/components/profile'
import type { ProfilePageProps } from '@app/profile/types'
import { validateId } from '@app/utils/validators'
import { USER_ID } from '@app/constants'

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

  const [
    { profile, followersCount, followingCount, id },
    { followers },
    { following },
  ] = await Promise.all([
    getUser(token, {
      userId,
    }),
    getUserFollowers(token, { userId }),
    getUserFollowing(token, { userId }),
  ])

  const userIdCookie = cookies().get(USER_ID)?.value
  const currentUserId = userIdCookie ? validateId(userIdCookie) : ''
  const isFollowingUser = followers.some(({ id }) => id === currentUserId)
  const isFollowingYou = following.some(({ id }) => id === currentUserId)

  return (
    <ProfileCard
      {...profile}
      id={id}
      isFollowingUser={isFollowingUser}
      isFollowingYou={isFollowingYou}
      isAuthenticated={!!token}
      currentUserId={currentUserId}
      followersCount={followersCount}
      followingCount={followingCount}
    >
      <Playback />
    </ProfileCard>
  )
}
