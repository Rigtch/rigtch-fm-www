import type { TopItemsSectionSkeletonProps } from './props'

import { ItemsListSkeleton } from '@app/components/items/list'
import { DefaultSection } from '@app/sections'
import { View } from '@app/profile/enums'

export function TopAlbumsSectionSkeleton({
  view = View.CARD,
}: TopItemsSectionSkeletonProps) {
  return (
    <DefaultSection title={'Top Albums'}>
      <ItemsListSkeleton withArtists={true} view={view} />
    </DefaultSection>
  )
}
