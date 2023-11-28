import { cookies } from 'next/headers'

import { ProfileTopSectionProps } from '../types'

import { TopItemsSection } from './top-items'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopTracks } from '@app/api/fetchers'
import { SeeMoreButton } from '@app/components/common'
import { validateTimeRange } from '@app/utils/time-range'
import { validateView } from '@app/utils/view'
import { TIME_RANGE, VIEW } from '@app/constants'

export async function ProfileTopTracksSection({
  searchParams,
  limit,
}: ProfileTopSectionProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const tracks = await getTopTracks(accessToken, timeRange, limit)

  return (
    <TopItemsSection items={tracks.items} title="Top Tracks" view={view}>
      <SeeMoreButton href="/profile/top/tracks" />
    </TopItemsSection>
  )
}
