import { ProfileCard } from '@app/profile/components/profile'
import { TopArtistsSkeleton } from '@app/profile/sections'

export default function ProfileTopArtistsLoading() {
  return (
    <>
      <ProfileCard
        id={''}
        displayName={''}
        email={''}
        country={''}
        href={''}
        followers={0}
      />

      <TopArtistsSkeleton />
    </>
  )
}
