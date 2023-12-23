import { cookies } from 'next/headers'

import { ProfileTopSectionProps } from '../types'

import { ItemsSection } from './items'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getLastTracks } from '@app/api/fetchers'

export async function ProfileRecentlyPlayedSection({
  limit,
  children,
}: Omit<ProfileTopSectionProps, 'searchParams'>) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const recentlyPlayedTracks = await getLastTracks(accessToken, limit)

  return (
    <ItemsSection
      items={recentlyPlayedTracks.items}
      title="Recently Played"
      withoutPosition
    >
      {children && <div className="flex justify-center">{children}</div>}
    </ItemsSection>
  )
}
