'use client'

import { useSearchParams } from 'next/navigation'

import { SelectView, ToggleTimeRange } from '@app/components/common'
import { ProfileCardSkeleton } from '@app/profile/components/profile/card.skeleton'
import { TopArtistsSkeleton } from '@app/profile/sections'
import { View } from '@app/types'
import { TIME_RANGE } from '@app/constants'
import { validateTimeRange } from '@app/utils/time-range'

export default function ProfileTopArtistsLoading() {
  const searchParams = useSearchParams()

  const timeRange = validateTimeRange(searchParams.get(TIME_RANGE))

  return (
    <>
      <ProfileCardSkeleton />

      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />

        <div>
          <SelectView initialValue={View.CARD} />
        </div>
      </div>

      <TopArtistsSkeleton />
    </>
  )
}
