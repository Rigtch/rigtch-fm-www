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
} from '@app/constants'
import { StatsProvider, type ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'
import type {
  SpotifyTimeRange,
  ArtistEntity,
  RigtchStatsResponse,
  RigtchTimeRange,
} from '@app/api/types'
import { validateStatsProvider } from '@app/profile/utils/stats-provider'
import { validateStatsMeasurement } from '@app/profile/utils/stats-measurement'
import { getRigtchTopArtists } from '@app/api/fetchers/stats/rigtch'
import { getAfterParam } from '@app/profile/utils/get-after-param'

export const runtime = 'edge'

export default async function ProfileTopArtistsPage({
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
      limit: 100,
      measurement: statsMeasurement,
    })
  } else {
    const { items: responseFirstPart } = await getTopArtists(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 50,
    })
    const { items: responseSecondPart } = await getTopArtists(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 50,
      offset: 49,
    })

    // Remove the first item of the second part to avoid duplicates
    responseFirstPart.shift()

    items = responseFirstPart.concat(responseSecondPart)
  }

  return <ItemsSection items={items} title="Top Artists" view={view} />
}
