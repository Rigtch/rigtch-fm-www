import { ItemsListSkeleton } from '@app/profile/components/items'
import { DefaultSection } from '@app/sections'

export interface TopArtistsSkeletonProps {
  isTop?: boolean
}

export function TopArtistsSkeleton({ isTop }: TopArtistsSkeletonProps) {
  return (
    <DefaultSection title={'Top Artists'}>
      <ItemsListSkeleton isTop={isTop} genres={true} />
    </DefaultSection>
  )
}
