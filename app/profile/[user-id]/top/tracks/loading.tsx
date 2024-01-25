import { ProfileCard } from '@app/profile/components/profile'
import { TopTracksSkeleton } from '@app/profile/sections'

export default function ProfileTopTracksLoading() {
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

      <TopTracksSkeleton />
    </>
  )
}
