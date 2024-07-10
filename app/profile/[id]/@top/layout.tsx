'use client'

import { useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'

import { ToggleStatsProvider } from '@app/profile/components/common'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import type { ProfileLayoutBaseProps } from '@app/profile/types'
import {
  SelectStatsMeasurement,
  SelectTimeRange,
  SelectView,
} from '@app/profile/components/common/selects'
import {
  validateStatsMeasurement,
  validateStatsProvider,
  validateTimeRange,
  validateView,
} from '@app/profile/utils/validators'
import { StatsProvider } from '@app/profile/enums'

export interface ProfileTopGenresSubLayoutProps extends ProfileLayoutBaseProps {
  genres: ReactNode
  artists: ReactNode
  tracks: ReactNode
  albums: ReactNode
}

export default function ProfileTopGenresSubLayout({
  genres,
  artists,
  tracks,
  albums,
}: ProfileTopGenresSubLayoutProps) {
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
      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleStatsProvider initialValue={statsProvider} />

        <div className="flex gap-2">
          {statsProvider === StatsProvider.RIGTCH && (
            <SelectStatsMeasurement initialValue={statsMeasurement} />
          )}

          <SelectTimeRange initialValue={timeRange} />

          <SelectView initialValue={view} />
        </div>
      </div>

      {genres}
      {artists}
      {albums}
      {tracks}
    </>
  )
}
