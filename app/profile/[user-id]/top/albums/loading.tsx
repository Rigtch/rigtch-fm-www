'use client'

import { useSearchParams } from 'next/navigation'

import { STATS_MEASUREMENT, TIME_RANGE, VIEW } from '@app/constants'
import {
  SelectStatsMeasurement,
  SelectTimeRange,
  SelectView,
} from '@app/profile/components/common/selects'
import { TopAlbumsSkeletonSection } from '@app/profile/sections'
import { validateStatsMeasurement } from '@app/profile/utils/stats-measurement'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { validateView } from '@app/profile/utils/view'
import { StatsProvider } from '@app/profile/types'

export default function ProfileTopArtistsLoading() {
  const searchParams = useSearchParams()

  const statsMeasurement = validateStatsMeasurement(
    searchParams.get(STATS_MEASUREMENT)
  )
  const timeRange = validateTimeRange(
    searchParams.get(TIME_RANGE),
    StatsProvider.RIGTCH
  )
  const view = validateView(searchParams.get(VIEW))

  return (
    <>
      <div className="flex justify-end flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="flex gap-2">
          <SelectStatsMeasurement initialValue={statsMeasurement} />

          <SelectTimeRange initialValue={timeRange} />

          <SelectView initialValue={view} />
        </div>
      </div>

      <TopAlbumsSkeletonSection view={view} />
    </>
  )
}
