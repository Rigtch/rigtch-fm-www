import { cookies } from 'next/headers'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopArtists } from '@app/api/fetchers'
import { PageProps } from '@app/types'
import { validateTimeRange } from '@app/utils/time-range'
import { TopItemsSection } from '@app/profile/sections'
import { validateView } from '@app/utils/view'
import { TIME_RANGE, VIEW } from '@app/constants'

export default async function ProfileTopArtistsPage({
  searchParams,
}: PageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const artistsFirstPart = await getTopArtists(accessToken, timeRange, 50)
  const artistsSecondPart = await getTopArtists(accessToken, timeRange, 50, 49)

  // Remove the first item of the second part to avoid duplicates
  artistsSecondPart.items.shift()
  const artists = artistsFirstPart.items.concat(artistsSecondPart.items)

  return <TopItemsSection items={artists} title="Top Artists" view={view} />
}
