import { cookies } from 'next/headers'

import '../audio-bars.css'

import { ProfileCard } from '@components/profile'
import { getProfile, getTopArtists, getTopGenres } from '@api/fetchers'
import { ACCESS_TOKEN } from '@api/constants'
import { TopGenresSection } from '@sections/profile/top-genres'
import { TopArtistsSection } from '@sections/profile/top-artists'

export default async function ProfilePage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const profile = await getProfile(accessToken)

  const genres = await getTopGenres(accessToken)

  const artists = await getTopArtists(accessToken)

  return (
    <div className="flex flex-col justify-center w-full px-4 md:px-12 gap-8">
      <ProfileCard {...profile} />

      <TopGenresSection {...genres} />

      <TopArtistsSection artists={artists} />
    </div>
  )
}
