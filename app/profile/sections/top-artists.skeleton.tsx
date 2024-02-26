import { ItemsListSkeleton } from '@app/profile/components/items'
import { DefaultSection } from '@app/sections'

export interface TopArtistsSkeletonProps {
  view?: boolean
}

export function TopArtistsSkeleton({ view }: TopArtistsSkeletonProps) {
  return (
    <DefaultSection title={'Top Artists'}>
      <ItemsListSkeleton view={view} genres={true} />
    </DefaultSection>
  )
}
