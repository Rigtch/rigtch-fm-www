'use client'

import { useSearchParams } from 'next/navigation'

import { SelectView, ToggleTimeRange } from '@app/components/common'
import { TopTracksSkeletonSection } from '@app/profile/sections'
import { TIME_RANGE, VIEW } from '@app/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { validateView } from '@app/profile/utils/view'

export default function ProfileTopTracksLoading() {
  const searchParams = useSearchParams()

  const timeRange = validateTimeRange(searchParams.get(TIME_RANGE))

  const view = validateView(searchParams.get(VIEW))

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />

        <div>
          <SelectView initialValue={view} />
        </div>
      </div>

      <TopTracksSkeletonSection view={view} />
    </>
  )
}
