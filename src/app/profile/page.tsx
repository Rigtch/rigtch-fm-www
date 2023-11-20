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
import {
  GenreChip,
  SeeMoreButton,
  SelectView,
  ToggleTimeRange,
} from '@components/common'
import { TopItemsSection } from '@sections/top-items'
import { ItemsSection } from '@sections/items'
import { DefaultSection } from '@sections/default'
import { getViewFromSearchParams } from '@utils/view'

export default async function ProfilePage({ searchParams }: PageProps) {
  const timeRange = getTimeRangeFromSearchParams(searchParams)
  const view = getViewFromSearchParams(searchParams)

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const { genres } = await getTopGenres(accessToken, timeRange)
  const artists = await getTopArtists(accessToken, timeRange)
  const tracks = await getTopTracks(accessToken, timeRange)
  const recentlyPlayedTracks = await getLastTracks(accessToken)

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />

        <div>
          <SelectView initialValue={view} />
        </div>
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

      <TopItemsSection items={artists.items} title="Top Artists" view={view}>
        <SeeMoreButton href="/profile/top/artists" timeRange={timeRange} />
      </TopItemsSection>

      <TopItemsSection items={tracks.items} title="Top Tracks" view={view}>
        <SeeMoreButton href="/profile/top/tracks" timeRange={timeRange} />
      </TopItemsSection>

      <ItemsSection items={recentlyPlayedTracks.items} title="Recently Played">
        <SeeMoreButton href="/profile/recently-played" />
      </ItemsSection>
    </>
  )
}
