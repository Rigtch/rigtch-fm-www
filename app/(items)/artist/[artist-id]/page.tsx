import Image from 'next/image'

import { ArtistPageProps } from '@app/(items)/types'
import { getArtist } from '@app/api/fetchers/get-artist'
import { getArtistTopTracks } from '@app/api/fetchers/get-artist-top-tracks'
import { SpotifyLink } from '@app/components/common'
import { ARTIST_ID } from '@app/constants'
import { ItemsList } from '@app/components/items'
import { getImage } from '@app/utils/get-image'
import { validateId } from '@app/utils/validate-id'

export default async function ArtistPage({ params }: ArtistPageProps) {
  const id = validateId(params[ARTIST_ID])

  const { followers, images, name, href, genres } = await getArtist({
    id,
  })

  const { tracks } = await getArtistTopTracks({ id })

  const followerCount = new Intl.NumberFormat('en-EN').format(followers)

  return (
    <div className="flex flex-col md:flex-row p-12">
      <div className="w-full md:w-1/2 flex flex-row flex-wrap p-12 gap-8">
        <Image
          src={getImage(images, 200)}
          className="rounded-xl md:rounded-md w-full md:h-[200px] md:w-[200px]"
          width="200"
          height="200"
          alt={name}
        />

        <div className="flex flex-col gap-6 justify-start">
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-5xl">{name}</span>

            <div className="flex flex-row items-center gap-2 mr-4">
              <SpotifyLink href={href} />

              <span className="text-md md:text-xl">
                Followers: {followerCount}
              </span>
            </div>
          </div>

          <div className="flex flex-row flex-wrap justify-center gap-4">
            {genres.slice(0, 3).map(genre => (
              <div className="rounded-xl bg-neutral-800 p-2" key={genre}>
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="text-4xl">Top Tracks</div>

        <ItemsList items={tracks.slice(0, 5)} positionClassName="text-2xl" />
      </div>
    </div>
  )
}
