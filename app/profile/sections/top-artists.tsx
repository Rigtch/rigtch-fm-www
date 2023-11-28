import { cookies } from 'next/headers'

import { ProfileTopSectionProps } from '../types'

import { TopItemsSection } from './top-items'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopArtists } from '@app/api/fetchers'
import { getTimeRangeFromSearchParams } from '@app/utils/time-range'
import { getViewFromSearchParams } from '@app/utils/view'
import { SeeMoreButton } from '@app/components/common'

export async function ProfileTopArtistsSection({
  searchParams,
  limit,
}: ProfileTopSectionProps) {
  const timeRange = getTimeRangeFromSearchParams(searchParams)
  const view = getViewFromSearchParams(searchParams)

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const artists = await getTopArtists(accessToken, timeRange, limit)

  return (
    <TopItemsSection items={artists.items} title="Top Artists" view={view}>
      <SeeMoreButton href="/profile/top/artists" />
    </TopItemsSection>
  )
}
