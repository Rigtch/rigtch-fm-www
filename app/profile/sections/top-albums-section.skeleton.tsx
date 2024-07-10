import { ItemsListSkeleton } from '@app/components/items/list'
import { DefaultSection } from '@app/sections'
import { View } from '@app/profile/enums'

export interface TopAlbumsSectionSkeletonProps {
  view?: View
}

export function TopAlbumsSectionSkeleton({
  view = View.CARD,
}: TopAlbumsSectionSkeletonProps) {
  return (
    <DefaultSection title={'Top Albums'}>
      <ItemsListSkeleton artists={true} view={view} />
    </DefaultSection>
  )
}
