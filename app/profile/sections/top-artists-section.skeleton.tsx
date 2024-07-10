import { ItemsListSkeleton } from '@app/components/items/list'
import { DefaultSection } from '@app/sections'
import { View } from '@app/profile/enums'

export interface TopArtistsSkeletonSectionProps {
  view?: View
}

export function TopArtistsSkeletonSection({
  view = View.CARD,
}: TopArtistsSkeletonSectionProps) {
  return (
    <DefaultSection title={'Top Artists'}>
      <ItemsListSkeleton view={view} genres={true} />
    </DefaultSection>
  )
}
