import { ItemsListSkeleton } from '@app/profile/components/items'
import { DefaultSection } from '@app/sections'

export interface TopTracksSkeletonProps {
  isTop?: boolean
}

export function TopTracksSkeleton({ isTop }: TopTracksSkeletonProps) {
  return (
    <DefaultSection title={'Top Tracks'}>
      <ItemsListSkeleton artists={true} isTop={isTop} />
    </DefaultSection>
  )
}
