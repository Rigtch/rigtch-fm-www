import { TimeRange } from '@app/api/types'
import { SelectView, ToggleTimeRange } from '@app/components/common'
import { ProfileCardSkeleton } from '@app/profile/components/profile/card.skeleton'
import { TopTracksSkeleton } from '@app/profile/sections'
import { View } from '@app/types'

export default function ProfileTopTracksLoading() {
  return (
    <>
      <ProfileCardSkeleton />

      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={TimeRange.SHORT_TERM} />

        <div>
          <SelectView initialValue={View.CARD} />
        </div>
      </div>

      <TopTracksSkeleton />
    </>
  )
}
