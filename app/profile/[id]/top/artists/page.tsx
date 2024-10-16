import { getUser } from '@app/api/fetchers'
import { getReportsTotalArtists } from '@app/api/fetchers/reports'
import { getRigtchTopArtists } from '@app/api/fetchers/stats/rigtch'
import { getSpotifyTopArtists } from '@app/api/fetchers/stats/spotify'
import type { ArtistEntity, RigtchStatsResponse } from '@app/api/types'
import { getServerToken } from '@app/auth/utils'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import {
  StatsProvider,
  type RigtchTimeRange,
  type SpotifyTimeRange,
} from '@app/profile/enums'
import { ItemsSection } from '@app/profile/sections'
import type { ProfilePageProps } from '@app/profile/types'
import { afterParamFactory } from '@app/profile/utils/factories'
import {
  validateStatsMeasurement,
  validateStatsProvider,
  validateTimeRange,
  validateView,
} from '@app/profile/utils/validators'
import { validateId } from '@app/utils/validators'

export const runtime = 'edge'

export default async function ProfileTopArtistsPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const token = await getServerToken(userId)

  const { createdAt } = await getUser(token, {
    userId,
  })

  const statsProvider = validateStatsProvider(
    searchParams[STATS_PROVIDER],
    createdAt
  )
  const measurement = validateStatsMeasurement(searchParams[STATS_MEASUREMENT])
  const timeRange = validateTimeRange(
    searchParams[TIME_RANGE],
    statsProvider,
    createdAt
  )
  const view = validateView(searchParams[VIEW])

  let items: ArtistEntity[] | RigtchStatsResponse<ArtistEntity>
  let total: number | undefined = undefined

  if (statsProvider === StatsProvider.RIGTCH) {
    const after = afterParamFactory(timeRange as RigtchTimeRange)

    const [response, totalResponse] = await Promise.all([
      getRigtchTopArtists(token, {
        after,
        userId,
        limit: 100,
        measurement,
      }),
      getReportsTotalArtists(token, {
        userId,
        after,
      }),
    ])

    items = response
    total = totalResponse.total
  } else {
    const { items: responseFirstPart } = await getSpotifyTopArtists(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 50,
    })
    const { items: responseSecondPart } = await getSpotifyTopArtists(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 50,
      offset: 49,
    })

    // Remove the first item of the second part to avoid duplicates
    responseFirstPart.shift()

    items = responseFirstPart.concat(responseSecondPart)
  }

  return (
    <ItemsSection items={items} title="Top Artists" view={view} total={total} />
  )
}
