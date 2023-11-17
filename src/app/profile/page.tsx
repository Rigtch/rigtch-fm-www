import { cookies } from 'next/headers'

import '../audio-bars.css'

import { ProfileCard } from '@components/profile'
import { getProfile, getTopArtists, getTopGenres } from '@api/fetchers'
import { ACCESS_TOKEN } from '@api/constants'
import { TopGenresSection } from '@sections/profile/top-genres'
import { TopArtistsSection } from '@sections/profile/top-artists'
import { SelectTimeRange } from '@components/common'
import { PageProps } from '@common/types'
import { getTimeRangeFromSearchParams } from '@utils/time-range'

export default async function ProfilePage({ searchParams }: PageProps) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const timeRange = getTimeRangeFromSearchParams(searchParams)

  const profile = await getProfile(accessToken)
  const genres = await getTopGenres(accessToken, timeRange)
  const artists = await getTopArtists(accessToken, timeRange)

  return (
    <div className="flex flex-col justify-center w-full px-4 md:px-12 gap-8">
      <ProfileCard {...profile} />

      <div className="flex">
        <SelectTimeRange initialValue={timeRange} />
      </div>

      <TopGenresSection {...genres} />

      <TopArtistsSection artists={artists} />
    </div>
  )
}
