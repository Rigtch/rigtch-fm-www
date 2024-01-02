import { ItemsListSkeleton } from '@app/profile/components/items'
import { DefaultSection } from '@app/sections'
import { SkeletonProps, View } from '@app/types'

export default function TopTracksSkeleton({ view }: SkeletonProps) {
  return (
    <DefaultSection title={'Top Tracks'}>
      <ItemsListSkeleton artists isTop={view === View.CARD} />
    </DefaultSection>
  )
}
