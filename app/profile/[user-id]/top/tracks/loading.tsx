'use client'

import { useSearchParams } from 'next/navigation'

import { TopTracksSkeletonSection } from '@app/profile/sections'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { validateView } from '@app/profile/utils/view'
import { ToggleStatsProvider } from '@app/profile/components/common'
import {
  SelectStatsMeasurement,
  SelectTimeRange,
  SelectView,
} from '@app/profile/components/common/selects'
import { validateStatsMeasurement } from '@app/profile/utils/stats-measurement'
import { validateStatsProvider } from '@app/profile/utils/stats-provider'
import { StatsProvider } from '@app/profile/types'

export default function ProfileTopTracksLoading() {
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

      <TopTracksSkeletonSection view={view} />
    </>
  )
}
