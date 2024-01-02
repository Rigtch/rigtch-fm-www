import { ItemsListSkeleton } from '@app/profile/components/items'
import { DefaultSection } from '@app/sections'
import { SkeletonProps, View } from '@app/types'

export default function TopArtistsSkeleton({ view }: SkeletonProps) {
  return (
    <DefaultSection title={'Top Artists'}>
      <ItemsListSkeleton isTop={view === View.CARD} />
    </DefaultSection>
  )
}
