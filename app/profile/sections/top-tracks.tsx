import { cookies } from 'next/headers'

import { ProfileTopSectionProps } from '../types'

import { TopItemsSection } from './top-items'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopTracks } from '@app/api/fetchers'
import { SeeMoreButton } from '@app/components/common'
import { getTimeRangeFromSearchParams } from '@app/utils/time-range'
import { getViewFromSearchParams } from '@app/utils/view'

export async function ProfileTopTracksSection({
  searchParams,
  limit,
}: ProfileTopSectionProps) {
  const timeRange = getTimeRangeFromSearchParams(searchParams)
  const view = getViewFromSearchParams(searchParams)

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const tracks = await getTopTracks(accessToken, timeRange, limit)

  return (
    <TopItemsSection items={tracks.items} title="Top Tracks" view={view}>
      <SeeMoreButton href="/profile/top/tracks" />
    </TopItemsSection>
  )
}
