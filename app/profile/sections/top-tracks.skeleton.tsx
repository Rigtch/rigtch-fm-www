import { ItemsListSkeleton } from '@app/profile/components/items'
import { DefaultSection } from '@app/sections'

export interface TopTracksSkeletonProps {
  view?: boolean
}

export function TopTracksSkeleton({ view }: TopTracksSkeletonProps) {
  return (
    <DefaultSection title={'Top Tracks'}>
      <ItemsListSkeleton artists={true} view={view} />
    </DefaultSection>
  )
}
