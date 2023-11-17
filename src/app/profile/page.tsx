import { cookies } from 'next/headers'

import { getLastTracks, getTopArtists, getTopGenres } from '@api/fetchers'
import { ACCESS_TOKEN } from '@api/constants'
import { TopGenresSection } from '@sections/profile/top-genres'
import { TopArtistsSection } from '@sections/profile/top-artists'
import { PageProps } from '@common/types'
import { getTimeRangeFromSearchParams } from '@utils/time-range'
import { RecentlyPlayedSection } from '@sections/profile'
import { SelectTimeRange } from '@components/common'

export default async function ProfilePage({ searchParams }: PageProps) {
  const timeRange = getTimeRangeFromSearchParams(searchParams)

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const genres = await getTopGenres(accessToken, timeRange)
  const artists = await getTopArtists(accessToken, timeRange)
  const recentlyPlayedTracks = await getLastTracks(accessToken)

  return (
    <>
      <div className="flex">
        <SelectTimeRange initialValue={timeRange} />
      </div>

      <TopGenresSection {...genres} />

      <TopArtistsSection items={artists.items} />

      <RecentlyPlayedSection items={recentlyPlayedTracks.items} />
    </>
  )
}
