import Image from 'next/image'

import { ArtistPageProps } from '@app/(items)/types'
import { getArtist } from '@app/api/fetchers/get-artist'
import { getArtistTopTracks } from '@app/api/fetchers/get-artist-top-tracks'
import { ButtonLink } from '@app/components/button-link'
import { OpenInSpotifyButton } from '@app/components/common'
import { ARTIST_ID } from '@app/constants'
import { getImage } from '@app/utils/get-image'
import { validateId } from '@app/utils/validate-id'

export default async function ArtistPage({ params }: ArtistPageProps) {
  const artistId = validateId(params[ARTIST_ID])

  const { followers, images, name, href, genres } = await getArtist({
    id: artistId,
  })

  const { tracks } = await getArtistTopTracks({ id: artistId })

  const followerCount = new Intl.NumberFormat('en-EN').format(followers)

  return (
    <div className="flex flex-col p-12">
      <div className="w-full flex md:flex-row flex-col p-12 gap-8">
        <Image
          src={getImage(images, 200)}
          className="rounded-xl md:rounded-md w-full md:h-[200px] md:w-[200px]"
          width="200"
          height="200"
          alt={name}
        />

        <div className="flex flex-col gap-6 justify-center">
          <div className="flex flex-col gap-2">
            <span className="text-5xl">{name}</span>

            <div className="flex flex-row items-center gap-2 mr-4">
              <OpenInSpotifyButton href={href} />

              <span className="text-xl">Followers: {followerCount}</span>
            </div>
          </div>

          <div className="flex flex-row flex-wrap gap-4">
            {genres.slice(0, 3).map(genre => (
              <div className="rounded-xl bg-neutral-800 p-2" key={genre}>
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="text-4xl">Top Tracks</div>

        <div className="flex flex-row flex-wrap justify-start gap-4 p-12">
          {tracks.slice(0, 5).map(({ id, name, href, album }) => (
            <div
              className="flex flex-col gap-2 bg-neutral-800 p-4 rounded-lg"
              key={id}
            >
              <Image
                src={getImage(album.images, 200)}
                className="rounded-md h-[180px] w-[180px]"
                width="200"
                height="200"
                alt={name}
              />

              <div className="flex flex-row justify-between gap-2">
                <ButtonLink href={`/track/${id}`}>
                  <span className="text-xl truncate w-[150px]">{name}</span>
                </ButtonLink>

                <OpenInSpotifyButton href={href} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
