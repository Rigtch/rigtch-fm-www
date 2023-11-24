import { cookies } from 'next/headers'

import { getTimeRangeFromSearchParams } from '@app/utils/time-range'
import { ACCESS_TOKEN } from '@app/api/constants'
import { PageProps } from '@app/types'
import { TopItemsSection } from '@app/profile/sections/top-items'
import { ItemsSection } from '@app/profile/sections/items'
import { DefaultSection } from '@app/sections/default'
import { getViewFromSearchParams } from '@app/utils/view'
import {
  GenreChip,
  SeeMoreButton,
  SelectView,
  ToggleTimeRange,
} from '@app/components/common'
import {
  getLastTracks,
  getTopArtists,
  getTopGenres,
  getTopTracks,
} from '@app/api/fetchers'

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

        <SeeMoreButton href="/profile/top/genres" />
      </DefaultSection>

      <TopItemsSection items={artists.items} title="Top Artists" view={view}>
        <SeeMoreButton href="/profile/top/artists" />
      </TopItemsSection>

      <TopItemsSection items={tracks.items} title="Top Tracks" view={view}>
        <SeeMoreButton href="/profile/top/tracks" />
      </TopItemsSection>

      <ItemsSection items={recentlyPlayedTracks.items} title="Recently Played">
        <SeeMoreButton href="/profile/recently-played" />
      </ItemsSection>
    </>
  )
}
