import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { getTopArtists } from '@app/api/fetchers'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { ItemsSection } from '@app/profile/sections'
import { validateView } from '@app/profile/utils/view'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import { SeeMoreButton } from '@app/components/common/buttons'
import { StatsProvider, type ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'
import type {
  ArtistEntity,
  RigtchStatsResponse,
  RigtchTimeRange,
  SpotifyTimeRange,
} from '@app/api/types'
import { getRigtchTopArtists } from '@app/api/fetchers/stats/rigtch'
import { getAfterParam } from '@app/profile/utils/get-after-param'
import { validateStatsProvider } from '@app/profile/utils/stats-provider'
import { validateStatsMeasurement } from '@app/profile/utils/stats-measurement'

export default async function ProfileTopArtistsSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const statsProvider = validateStatsProvider(searchParams[STATS_PROVIDER])
  const statsMeasurement = validateStatsMeasurement(
    searchParams[STATS_MEASUREMENT]
  )
  const timeRange = validateTimeRange(searchParams[TIME_RANGE], statsProvider)
  const view = validateView(searchParams[VIEW])

  const token = await getServerToken()

  if (!token) redirect('/')

  let items: ArtistEntity[] | RigtchStatsResponse<ArtistEntity>

  if (statsProvider === StatsProvider.RIGTCH) {
    items = await getRigtchTopArtists(token, {
      after: getAfterParam(timeRange as RigtchTimeRange),
      userId,
      limit: 10,
      measurement: statsMeasurement,
    })
  } else {
    const response = await getTopArtists(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 10,
    })

    items = response.items
  }

  return (
    <ItemsSection items={items} title="Top Artists" view={view}>
      <SeeMoreButton href={`/profile/${userId}/top/artists`} />
    </ItemsSection>
  )
}
