import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import {
  ProfileRecentlyPlayedSection,
  ProfileTopArtistsSection,
  ProfileTopGenresSection,
  ProfileTopTracksSection,
  ProfileAnalysisSection,
  TopGenresSkeleton,
  AnalysisSkeleton,
  ProfileSection,
} from '../sections'
import { ItemsListSkeleton } from '../components/items'

import { PageProps } from '@app/types'
import { validateTimeRange } from '@app/utils/time-range'
import { validateView } from '@app/utils/view'
import {
  SeeMoreButton,
  SelectView,
  ToggleTimeRange,
} from '@app/components/common'
import { ErrorBoundary } from '@app/error-boundary'
import { TIME_RANGE, USER_ID, VIEW } from '@app/constants'

export default function ProfilePage({ searchParams, params }: PageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])
  const userId = params?.[USER_ID]?.toString()

  if (!userId) return notFound()

  return (
    <>
      <ProfileSection userId={userId} />

      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />

        <div>
          <SelectView initialValue={view} />
        </div>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<TopGenresSkeleton length={10} />}>
          <ProfileTopGenresSection searchParams={searchParams} userId={userId}>
            <SeeMoreButton href={`/profile/${userId}/top/genres`} />
          </ProfileTopGenresSection>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<ItemsListSkeleton artists />}>
          <ProfileTopArtistsSection searchParams={searchParams} userId={userId}>
            <SeeMoreButton href={`/profile/${userId}/top/artists`} />
          </ProfileTopArtistsSection>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<ItemsListSkeleton />}>
          <ProfileTopTracksSection searchParams={searchParams} userId={userId}>
            <SeeMoreButton href={`/profile/${userId}/top/tracks`} />
          </ProfileTopTracksSection>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<AnalysisSkeleton />}>
          <ProfileAnalysisSection userId={userId} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<ItemsListSkeleton withoutPosition />}>
          <ProfileRecentlyPlayedSection userId={userId}>
            <SeeMoreButton href={`/profile/${userId}/recently-played`} />
          </ProfileRecentlyPlayedSection>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
