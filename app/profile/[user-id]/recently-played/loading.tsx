import { RecentlyPlayedSkeleton } from '../../sections'

import { ProfileCard } from '@app/profile/components/profile'

export default function ProfileRecentlyPlayedPageSkeleton() {
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

      <RecentlyPlayedSkeleton />
    </>
  )
}
