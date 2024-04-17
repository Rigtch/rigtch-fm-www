import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { ItemsSection } from '@app/profile/sections'
import { ProfilePageProps } from '@app/profile/types'
import { USER_ID } from '@app/constants'
import { ACCESS_TOKEN } from '@app/api/constants'
import { getRecentlyPlayed } from '@app/api/fetchers'
import { SeeMoreButton } from '@app/components/common'

export default async function ProfileRecentlyPlayedSubPage({
  params,
}: ProfilePageProps) {
  const userId = validateId(params[USER_ID])
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
