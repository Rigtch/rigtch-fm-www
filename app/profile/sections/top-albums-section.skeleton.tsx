import { ItemsListSkeleton } from '@app/components/items/list'
import { DefaultSection } from '@app/sections'
import { View } from '@app/types'

export interface TopAlbumsSkeletonSectionProps {
  view?: View
}

export function TopAlbumsSkeletonSection({
  view = View.CARD,
}: TopAlbumsSkeletonSectionProps) {
  return (
    <DefaultSection title={'Top Albums'}>
      <ItemsListSkeleton artists={true} view={view} />
    </DefaultSection>
  )
}
