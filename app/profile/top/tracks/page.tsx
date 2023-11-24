import { cookies } from 'next/headers'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopTracks } from '@app/api/fetchers'
import { PageProps } from '@app/types'
import { TopItemsSection } from '@app/profile/sections/top-items'
import { getTimeRangeFromSearchParams } from '@app/utils/time-range'
import { getViewFromSearchParams } from '@app/utils/view'

export default async function ProfileTopTracksPage({
  searchParams,
}: PageProps) {
  const timeRange = getTimeRangeFromSearchParams(searchParams)
  const view = getViewFromSearchParams(searchParams)

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const tracksFirstPart = await getTopTracks(accessToken, timeRange, 50)
  const tracksSecondPart = await getTopTracks(accessToken, timeRange, 50, 49)

  // Remove the first item of the second part to avoid duplicates
  tracksSecondPart.items.shift()
  const tracks = tracksFirstPart.items.concat(tracksSecondPart.items)

  return <TopItemsSection items={tracks} title="Top Tracks" view={view} />
}
