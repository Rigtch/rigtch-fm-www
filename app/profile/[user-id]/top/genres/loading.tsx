'use client'

import { useSearchParams } from 'next/navigation'

import { TopGenresSkeleton } from '@app/profile/sections'
import { STATS_MEASUREMENT, STATS_PROVIDER, TIME_RANGE } from '@app/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { validateStatsProvider } from '@app/profile/utils/stats-provider'
import {
  SelectStatsMeasurement,
  SelectTimeRange,
} from '@app/profile/components/common/selects'
import { validateStatsMeasurement } from '@app/profile/utils/stats-measurement'
import { ToggleStatsProvider } from '@app/profile/components/common'
import { StatsProvider } from '@app/profile/types'

export default function TopGenresLoading() {
  const searchParams = useSearchParams()

  const statsProvider = validateStatsProvider(searchParams.get(STATS_PROVIDER))
  const statsMeasurement = validateStatsMeasurement(
    searchParams.get(STATS_MEASUREMENT)
  )
  const timeRange = validateTimeRange(
    searchParams.get(TIME_RANGE),
    statsProvider
  )

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleStatsProvider initialValue={statsProvider} />

        <div className="flex gap-2">
          {statsProvider === StatsProvider.RIGTCH && (
            <SelectStatsMeasurement initialValue={statsMeasurement} />
          )}

          <SelectTimeRange initialValue={timeRange} />
        </div>
      </div>

      <TopGenresSkeleton />
    </>
  )
}
