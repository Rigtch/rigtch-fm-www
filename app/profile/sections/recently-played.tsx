import { cookies } from 'next/headers'

import { ProfileTopSectionProps } from '../types'

import { ItemsSection } from './items'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getLastTracks } from '@app/api/fetchers'
import { SeeMoreButton } from '@app/components/common'

export async function ProfileRecentlyPlayedSection({
  limit,
}: Omit<ProfileTopSectionProps, 'searchParams'>) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const recentlyPlayedTracks = await getLastTracks(accessToken, limit)

  return (
    <ItemsSection
      items={recentlyPlayedTracks.items}
      title="Recently Played"
      withoutPosition
    >
      <SeeMoreButton href="/profile/recently-played" />
    </ItemsSection>
  )
}
