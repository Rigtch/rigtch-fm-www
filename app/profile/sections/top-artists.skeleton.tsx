import { ItemsListSkeleton } from '@app/profile/components/items'
import { DefaultSection } from '@app/sections'

export default function TopArtistsSkeleton() {
  return (
    <DefaultSection title={'Top Artists'}>
      <ItemsListSkeleton isTop />
    </DefaultSection>
  )
}
