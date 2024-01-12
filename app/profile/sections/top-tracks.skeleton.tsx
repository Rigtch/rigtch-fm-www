import { ItemsListSkeleton } from '@app/profile/components/items'
import { DefaultSection } from '@app/sections'

export function TopTracksSkeleton() {
  return (
    <DefaultSection title={'Top Tracks'}>
      <ItemsListSkeleton artists isTop />
    </DefaultSection>
  )
}
