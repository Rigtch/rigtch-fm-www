import { ItemsListSkeleton } from '@app/components/items/list'
import { DefaultSection } from '@app/sections'
import { View } from '@app/profile/enums'

export interface TopTracksSkeletonSectionProps {
  view?: View
}

export function TopTracksSkeletonSection({
  view = View.CARD,
}: TopTracksSkeletonSectionProps) {
  return (
    <DefaultSection title={'Top Tracks'}>
      <ItemsListSkeleton artists={true} view={view} />
    </DefaultSection>
  )
}
