import { cookies } from 'next/headers'

import {
  getLastTracks,
  getTopArtists,
  getTopGenres,
  getTopTracks,
} from '@api/fetchers'
import { ACCESS_TOKEN } from '@api/constants'
import { PageProps } from '@common/types'
import { getTimeRangeFromSearchParams } from '@utils/time-range'
import { GenreChip, SeeMoreButton, SelectTimeRange } from '@components/common'
import { TopItemsSection } from '@sections/top-items'
import { ItemsSection } from '@sections/items'
import { DefaultSection } from '@sections/default'

export default async function ProfilePage({ searchParams }: PageProps) {
  const timeRange = getTimeRangeFromSearchParams(searchParams)

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const { genres } = await getTopGenres(accessToken, timeRange)
  const artists = await getTopArtists(accessToken, timeRange)
  const tracks = await getTopTracks(accessToken, timeRange)
  const recentlyPlayedTracks = await getLastTracks(accessToken)

  return (
    <>
      <div className="flex">
        <SelectTimeRange initialValue={timeRange} />
      </div>

      <DefaultSection title="Top Genres">
        <div className="flex flex-row flex-wrap gap-2">
          {genres?.map(genre => (
            <div key={genre}>
              <GenreChip genre={genre} />
            </div>
          ))}
        </div>

        <SeeMoreButton href="/profile/top/genres" timeRange={timeRange} />
      </DefaultSection>

      <TopItemsSection items={artists.items} title="Top Artists">
        <SeeMoreButton href="/profile/top/artists" timeRange={timeRange} />
      </TopItemsSection>

      <TopItemsSection items={tracks.items} title="Top Tracks">
        <SeeMoreButton href="/profile/top/tracks" timeRange={timeRange} />
      </TopItemsSection>

      <ItemsSection items={recentlyPlayedTracks.items} title="Recently Played">
        <SeeMoreButton href="/profile/recently-played" />
      </ItemsSection>
    </>
  )
}
