import { Suspense } from 'react'

import {
  ProfileRecentlyPlayedSection,
  ProfileTopArtistsSection,
  ProfileTopGenresSection,
  ProfileTopTracksSection,
} from './sections'
import { ProfileAnalysisSection } from './sections/analysis'

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

export default async function ProfilePage({ searchParams }: PageProps) {
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
        <Suspense fallback={<div>loading</div>}>
          <ProfileTopGenresSection searchParams={searchParams}>
            <SeeMoreButton href="/profile/top/genres" />
          </ProfileTopGenresSection>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div>loading</div>}>
          <ProfileTopArtistsSection searchParams={searchParams}>
            <SeeMoreButton href="/profile/top/artists" />
          </ProfileTopArtistsSection>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div>loading</div>}>
          <ProfileTopTracksSection searchParams={searchParams}>
            <SeeMoreButton href="/profile/top/tracks" />
          </ProfileTopTracksSection>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div>loading</div>}>
          <ProfileRecentlyPlayedSection>
            <SeeMoreButton href="/profile/recently-played" />
          </ProfileRecentlyPlayedSection>
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div>loading</div>}>
          <ProfileAnalysisSection />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
