import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ItemsSection } from '@app/profile/sections'
import { ProfilePageProps } from '@app/profile/types'
import { USER_ID } from '@app/constants'
import { ACCESS_TOKEN } from '@app/api/constants'
import { getRecentlyPlayed } from '@app/api/fetchers'
import { SeeMoreButton } from '@app/components/common'
import { validateUserId } from '@app/profile/utils/user-id'

export default async function ProfileRecentlyPlayedSubPage({
  params,
}: ProfilePageProps) {
  const userId = validateUserId(params[USER_ID])
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect('/')

  const recentlyPlayedTracks = await getRecentlyPlayed(accessToken, {
    limit: 10,
    userId,
  })

  return (
    <ItemsSection
      items={recentlyPlayedTracks.items}
      title="Recently Played"
      withoutPosition
    >
      <SeeMoreButton href={`/profile/${userId}/recently-played`} />
    </ItemsSection>
  )
}
