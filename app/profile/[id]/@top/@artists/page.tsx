import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validators'
import { ItemsSection } from '@app/profile/sections'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import { SeeMoreButton } from '@app/components/common/buttons'
import type { ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'
import type { ArtistEntity, RigtchStatsResponse } from '@app/api/types'
import { getRigtchTopArtists } from '@app/api/fetchers/stats/rigtch'
import { getSpotifyTopArtists } from '@app/api/fetchers/stats/spotify'
import {
  validateStatsProvider,
  validateStatsMeasurement,
  validateTimeRange,
  validateView,
} from '@app/profile/utils/validators'
import { afterParamFactory } from '@app/profile/utils/factories'
import {
  StatsProvider,
  type RigtchTimeRange,
  type SpotifyTimeRange,
} from '@app/profile/enums'

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
      after: afterParamFactory(timeRange as RigtchTimeRange),
      userId,
      limit: 10,
      measurement: statsMeasurement,
    })
  } else {
    const response = await getSpotifyTopArtists(token, {
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