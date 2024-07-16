import type { TopItemsSectionSkeletonProps } from './props'

import { ItemsListSkeleton } from '@app/components/items/list'
import { DefaultSection } from '@app/sections'
import { View } from '@app/profile/enums'

export function TopTracksSectionSkeleton({
  view = View.CARD,
}: TopItemsSectionSkeletonProps) {
  return (
    <DefaultSection title={'Top Tracks'}>
      <ItemsListSkeleton artists={true} view={view} />
    </DefaultSection>
  )
}
