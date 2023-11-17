import { cookies } from 'next/headers'

import { ACCESS_TOKEN } from '@api/constants'
import { getTopArtists } from '@api/fetchers'
import { PageProps } from '@common/types'
import { TopArtistsSection } from '@sections/profile'
import { getTimeRangeFromSearchParams } from '@utils/time-range'

export default async function ProfileTopArtistsPage({
  searchParams,
}: PageProps) {
  const timeRange = getTimeRangeFromSearchParams(searchParams)

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const artistsFirstPart = await getTopArtists(accessToken, timeRange, 50)
  const artistsSecondPart = await getTopArtists(accessToken, timeRange, 50, 49)

  // Remove the first item of the second part to avoid duplicates
  artistsSecondPart.items.shift()
  const artists = artistsFirstPart.items.concat(artistsSecondPart.items)

  return (
    <>
      <TopArtistsSection items={artists} />
    </>
  )
}
