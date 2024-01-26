import { ProfileCardSkeleton } from '@app/profile/components/profile/card.skeleton'
import { TopTracksSkeleton } from '@app/profile/sections'

export default function ProfileTopTracksLoading() {
  return (
    <>
      <ProfileCardSkeleton />

      <TopTracksSkeleton />
    </>
  )
}
