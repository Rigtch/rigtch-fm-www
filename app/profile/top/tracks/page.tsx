import { cookies } from 'next/headers'
import { Suspense } from 'react'

import ProfileTopTracksLoading from './loading'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopTracks } from '@app/api/fetchers'
import { PageProps } from '@app/types'
import { TopItemsSection } from '@app/profile/sections'
import { validateTimeRange } from '@app/utils/time-range'
import { validateView } from '@app/utils/view'
import { TIME_RANGE, VIEW } from '@app/constants'

export default async function ProfileTopTracksPage({
  searchParams,
}: PageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const tracksFirstPart = await getTopTracks(accessToken, timeRange, 50)
  const tracksSecondPart = await getTopTracks(accessToken, timeRange, 50, 49)

  // Remove the first item of the second part to avoid duplicates
  tracksSecondPart.items.shift()
  const tracks = tracksFirstPart.items.concat(tracksSecondPart.items)

  return (
    <Suspense fallback={<ProfileTopTracksLoading />}>
      <TopItemsSection items={tracks} title="Top Tracks" view={view} />
    </Suspense>
  )
}
