import { ItemsListSkeleton } from '@app/components/items/list'
import { DefaultSection } from '@app/sections'
import { View } from '@app/profile/enums'

export interface TopTracksSectionSkeletonProps {
  view?: View
}

export function TopTracksSectionSkeleton({
  view = View.CARD,
}: TopTracksSectionSkeletonProps) {
  return (
    <DefaultSection title={'Top Tracks'}>
      <ItemsListSkeleton artists={true} view={view} />
    </DefaultSection>
  )
}
