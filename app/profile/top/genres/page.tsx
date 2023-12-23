import { Suspense } from 'react'

import { TopGenresLoading } from './loading'

import { PageProps } from '@app/types'
import { ProfileTopGenresSection } from '@app/profile/sections'

export default function ProfileTopGenresPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<TopGenresLoading />}>
      <ProfileTopGenresSection searchParams={searchParams} limit={50} />
    </Suspense>
  )
}
