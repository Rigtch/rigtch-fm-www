import { Suspense } from 'react'

import { ProfileTopGenresSection } from './sections/top-genres'
import { ProfileTopTracksSection } from './sections/top-tracks'
import { ProfileTopArtistsSection } from './sections/top-artists'
import { ProfileRecentlyPlayedSection } from './sections/recently-played'

import { PageProps } from '@app/types'
import { getTimeRangeFromSearchParams } from '@app/utils/time-range'
import { getViewFromSearchParams } from '@app/utils/view'
import { SelectView, ToggleTimeRange } from '@app/components/common'
import { ErrorBoundary } from '@app/error-boundary'

export default async function ProfilePage({ searchParams }: PageProps) {
  const timeRange = getTimeRangeFromSearchParams(searchParams)
  const view = getViewFromSearchParams(searchParams)

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
          <ProfileTopGenresSection searchParams={searchParams} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div>loading</div>}>
          <ProfileTopArtistsSection searchParams={searchParams} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div>loading</div>}>
          <ProfileTopTracksSection searchParams={searchParams} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div>loading</div>}>
          <ProfileRecentlyPlayedSection />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
