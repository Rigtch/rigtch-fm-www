import { ItemsListSkeleton } from '@app/components/items'
import { DefaultSection } from '@app/sections'
import { View } from '@app/types'

export interface TopTracksSkeletonProps {
  view?: View
}

export function TopTracksSkeleton({ view }: TopTracksSkeletonProps) {
  return (
    <DefaultSection title={'Top Tracks'}>
      <ItemsListSkeleton artists={true} view={view} />
    </DefaultSection>
  )
}
