import { ItemsListSkeleton } from '@app/components/items/list'
import { DefaultSection } from '@app/sections'
import { View } from '@app/profile/enums'

export interface TopArtistsSectionSkeletonProps {
  view?: View
}

export function TopArtistsSectionSkeleton({
  view = View.CARD,
}: TopArtistsSectionSkeletonProps) {
  return (
    <DefaultSection title={'Top Artists'}>
      <ItemsListSkeleton view={view} genres={true} />
    </DefaultSection>
  )
}
