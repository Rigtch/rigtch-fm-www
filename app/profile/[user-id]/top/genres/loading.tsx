import { ProfileCardSkeleton } from '@app/profile/components/profile/card.skeleton'
import { TopGenresSkeleton } from '@app/profile/sections'

export default function TopGenresLoading() {
  return (
    <>
      <ProfileCardSkeleton />

      <TopGenresSkeleton />
    </>
  )
}
