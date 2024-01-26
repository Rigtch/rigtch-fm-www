import { RecentlyPlayedSkeleton } from '../../sections'

import { ProfileCardSkeleton } from '@app/profile/components/profile/card.skeleton'

export default function ProfileRecentlyPlayedPageSkeleton() {
  return (
    <>
      <ProfileCardSkeleton />

      <RecentlyPlayedSkeleton />
    </>
  )
}
