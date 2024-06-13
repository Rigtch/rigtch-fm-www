import { ItemsListSkeleton } from '@app/components/items'
import { DefaultSection } from '@app/sections'
import { View } from '@app/types'

export interface TopArtistsSkeletonProps {
  view?: View
}

export function TopArtistsSkeleton({ view }: TopArtistsSkeletonProps) {
  return (
    <DefaultSection title={'Top Artists'}>
      <ItemsListSkeleton view={view} genres={true} />
    </DefaultSection>
  )
}
