import Image from 'next/image'

import { AlbumPageProps } from '@app/(items)/types'
import { getAlbum } from '@app/api/fetchers/get-album'
import { ALBUM_ID } from '@app/constants'
import { validateId } from '@app/utils/validate-id'
import { OpenInSpotifyButton } from '@app/components/common'
import { ButtonLink } from '@app/components/button-link'

export default async function AlbumPage({ params }: AlbumPageProps) {
  const albumId = validateId(params[ALBUM_ID])

  const { name, images, artists, href, releaseDate, tracks } = await getAlbum({
    id: albumId,
  })

  const dateOfRelease = new Date(releaseDate)

  console.log(tracks)

  return (
    <div className="w-full flex flex-col p-12 gap-2">
      <div className="w-full flex md:flex-row flex-col p-12 gap-8">
        <Image
          src={images[0].url}
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

              <span className="text-xl">
                by{' '}
                {artists.map((artist, index) => (
                  <ButtonLink key={index} href={`/artist/${artist.id}`}>
                    {artist.name}
                  </ButtonLink>
                ))}
              </span>
            </div>

            <div>Release date: {dateOfRelease.toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="text-3xl">Tracks</div>

        <div className="grid grid-cols-4 gap-4 p-4">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between gap-4 p-2 px-4 bg-neutral-800 rounded-xl"
            >
              <div className="flex flex-row items-center gap-3">
                <span className="text-xl">{index + 1}</span>

                <ButtonLink href={`/track/${track.id}`}>
                  <span>{track.name}</span>
                </ButtonLink>
              </div>

              <OpenInSpotifyButton href={track.href} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
