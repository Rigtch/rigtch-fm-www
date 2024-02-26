'use client'

import { useSearchParams } from 'next/navigation'

import { SelectView, ToggleTimeRange } from '@app/components/common'
import { TopTracksSkeleton } from '@app/profile/sections'
import { View } from '@app/types'
import { TIME_RANGE, VIEW } from '@app/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'

export default function ProfileTopTracksLoading() {
  const searchParams = useSearchParams()

  const timeRange = validateTimeRange(searchParams.get(TIME_RANGE))

  const view = searchParams.get(VIEW)

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />

        <div>
          <SelectView initialValue={view === 'card' ? View.CARD : View.LIST} />
        </div>
      </div>

      <TopTracksSkeleton isTop={view === 'card'} />
    </>
  )
}
