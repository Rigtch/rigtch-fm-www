import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validators'
import { ItemsSection } from '@app/profile/sections'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import { StatsProvider, type ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'
import type {
  RigtchStatsResponse,
  RigtchTimeRange,
  SpotifyTimeRange,
  TrackEntity,
} from '@app/api/types'
import { getRigtchTopTracks } from '@app/api/fetchers/stats/rigtch'
import { getSpotifyTopTracks } from '@app/api/fetchers/stats/spotify'
import {
  validateStatsMeasurement,
  validateStatsProvider,
  validateTimeRange,
  validateView,
} from '@app/profile/utils/validators'
import { afterParamFactory } from '@app/profile/utils/factories'

export const runtime = 'edge'

export default async function ProfileTopTracksPage({
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

  let items: TrackEntity[] | RigtchStatsResponse<TrackEntity>

  if (statsProvider === StatsProvider.RIGTCH) {
    items = await getRigtchTopTracks(token, {
      after: afterParamFactory(timeRange as RigtchTimeRange),
      userId,
      limit: 100,
      measurement: statsMeasurement,
    })
  } else {
    const { items: responseFirstPart } = await getSpotifyTopTracks(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 50,
      offset: 0,
    })
    const { items: responseSecondPart } = await getSpotifyTopTracks(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 50,
      offset: 49,
    })

    // Remove the first item of the second part to avoid duplicates
    responseFirstPart.shift()

    items = responseFirstPart.concat(responseSecondPart)
  }

  return <ItemsSection items={items} title="Top Tracks" view={view} />
}
