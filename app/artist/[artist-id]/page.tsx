import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getArtist } from '@app/api/fetchers/get-artist'
import { ARTIST_ID } from '@app/constants'
import { ArtistPageProps } from '@app/profile/types'
import { OpenInSpotifyButton } from '@app/components/common'

export default async function ArtistPage({ params }: ArtistPageProps) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect('/')

  if (!params[ARTIST_ID]) redirect('/profile')

  const artist = await getArtist(accessToken, { id: params[ARTIST_ID] })

  console.log(artist.genres, 'genres')

  return (
    <div className="w-full flex md:flex-row flex-col p-12 gap-8">
      <Image
        src={artist.images[0].url}
        className="rounded-md w-full md:h-[200px] md:w-[200px]"
        width="200"
        height="200"
        alt={''}
      />

      <div className="flex flex-col gap-6 justify-center">
        <span className="text-5xl">{artist.name}</span>

        <div className="flex flex-row items-end gap-4 mr-4">
          <OpenInSpotifyButton href={artist.href} />
          <span className="text-xl">Followers: {artist.followers}</span>
        </div>

        <div className="flex flex-row flex-wrap gap-4">
          {artist.genres.slice(0, 3).map(genre => (
            <div className="rounded-xl bg-neutral-800 p-2" key={genre}>
              {genre}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
