import { ProfileCard } from '@app/profile/components/profile'
import { TopGenresSkeleton } from '@app/profile/sections'

export default function TopGenresLoading() {
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

      <TopGenresSkeleton />
    </>
  )
}
