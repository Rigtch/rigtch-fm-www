'use client'

import { useSearchParams } from 'next/navigation'

import { ToggleTimeRange } from '@app/components/common'
import { TopGenresSkeleton } from '@app/profile/sections'
import { TIME_RANGE } from '@app/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'

export default function TopGenresLoading() {
  const searchParams = useSearchParams()

  const timeRange = validateTimeRange(searchParams.get(TIME_RANGE))

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />
      </div>

      <TopGenresSkeleton />
    </>
  )
}
