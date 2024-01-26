import { ProfileCardSkeleton } from '@app/profile/components/profile/card.skeleton'
import { TopArtistsSkeleton } from '@app/profile/sections'

export default function ProfileTopArtistsLoading() {
  return (
    <>
      <ProfileCardSkeleton />

      <TopArtistsSkeleton />
    </>
  )
}
