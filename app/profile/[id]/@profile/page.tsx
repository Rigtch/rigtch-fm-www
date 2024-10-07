import type { Metadata } from 'next'

import { getUser } from '@app/api/fetchers'
import { getServerToken } from '@app/auth/utils'
import { Playback } from '@app/profile/components/playback'
import { ProfileCard } from '@app/profile/components/profile'
import type { ProfilePageProps } from '@app/profile/types'
import { validateId } from '@app/utils/validators'

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
  const { profile, followersCount, followingCount } = await getUser(token, {
    userId,
  })

  return (
    <ProfileCard
      {...profile}
      followersCount={followersCount}
      followingCount={followingCount}
    >
      <Playback />
    </ProfileCard>
  )
}
