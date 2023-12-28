import { Suspense } from 'react'

import {
  ProfileRecentlyPlayedSection,
  ProfileTopArtistsSection,
  ProfileTopGenresSection,
  ProfileTopTracksSection,
  ProfileAnalysisSection,
} from './sections'
import { ItemsListSkeleton } from './components/items/list.skeleton'
import { TopGenresSkeleton } from './sections/top-genres.skeleton'
import { AnalysisSkeleton } from './sections/analysis.skeleton'

import { PageProps } from '@app/types'
import { validateTimeRange } from '@app/utils/time-range'
import { validateView } from '@app/utils/view'
import {
  SeeMoreButton,
  SelectView,
  ToggleTimeRange,
} from '@app/components/common'
import { ErrorBoundary } from '@app/error-boundary'
import { TIME_RANGE, VIEW } from '@app/constants'

export default function ProfilePage({ searchParams }: PageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />

        <div>
          <SelectView initialValue={view} />
        </div>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<TopGenresSkeleton />}>
          <ProfileTopGenresSection searchParams={searchParams}>
            <SeeMoreButton href="/profile/top/genres" />
          </ProfileTopGenresSection>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<ItemsListSkeleton artists />}>
          <ProfileTopArtistsSection searchParams={searchParams}>
            <SeeMoreButton href="/profile/top/artists" />
          </ProfileTopArtistsSection>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<ItemsListSkeleton />}>
          <ProfileTopTracksSection searchParams={searchParams}>
            <SeeMoreButton href="/profile/top/tracks" />
          </ProfileTopTracksSection>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<AnalysisSkeleton />}>
          <ProfileAnalysisSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<ItemsListSkeleton withoutPosition />}>
          <ProfileRecentlyPlayedSection>
            <SeeMoreButton href="/profile/recently-played" />
          </ProfileRecentlyPlayedSection>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
