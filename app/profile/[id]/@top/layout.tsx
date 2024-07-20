'use client'

import { useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'

import { StatsOptions } from '@app/profile/components/common'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import type { ProfileLayoutBaseProps } from '@app/profile/types'
import {
  validateStatsMeasurement,
  validateStatsProvider,
  validateTimeRange,
  validateView,
} from '@app/profile/utils/validators'

namespace ProfileTopGenresSubLayout {
  export interface Props extends ProfileLayoutBaseProps {
    genres: ReactNode
    artists: ReactNode
    tracks: ReactNode
    albums: ReactNode
  }
}

function ProfileTopGenresSubLayout({
  genres,
  artists,
  tracks,
  albums,
}: ProfileTopGenresSubLayout.Props) {
  const searchParams = useSearchParams()
  const statsProvider = validateStatsProvider(searchParams.get(STATS_PROVIDER))
  const timeRange = validateTimeRange(
    searchParams.get(TIME_RANGE),
    statsProvider
  )
  const statsMeasurement = validateStatsMeasurement(
    searchParams.get(STATS_MEASUREMENT)
  )
  const view = validateView(searchParams.get(VIEW))

  return (
    <>
      <StatsOptions
        statsProvider={statsProvider}
        statsMeasurement={statsMeasurement}
        view={view}
        timeRange={timeRange}
      />

      {genres}
      {artists}
      {albums}
      {tracks}
    </>
  )
}

export default ProfileTopGenresSubLayout
