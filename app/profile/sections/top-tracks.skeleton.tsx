import { ItemsListSkeleton } from '@app/profile/components/items'
import { DefaultSection } from '@app/sections'

export default function TopTracksSkeleton() {
  return (
    <DefaultSection title={'Top Tracks'}>
      <ItemsListSkeleton artists isTop />
    </DefaultSection>
  )
}
