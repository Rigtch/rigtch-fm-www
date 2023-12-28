import { Suspense } from 'react'

import { ProfileRecentlyPlayedSection } from '../sections'

import ProfileRecentlyPlayedPageSkeleton from './loading'

export default function ProfileRecentlyPlayedPage() {
  return (
    <Suspense fallback={<ProfileRecentlyPlayedPageSkeleton />}>
      <ProfileRecentlyPlayedSection limit={50} />
    </Suspense>
  )
}
