import Link from 'next/link'
import { FaCompactDisc } from 'react-icons/fa'

import { getAlbum } from '@app/api/fetchers/items'
import { SpotifyLink } from '@app/components/common'
import { validateId } from '@app/utils/validators'
import { ItemHeaderSection } from '@app/(items)/sections'
import { ItemArtists } from '@app/components/items/misc'
import type { PageWithIdParamProps } from '@app/types'

export default async function AlbumPage({ params }: PageWithIdParamProps) {
  const id = validateId(params.id)

  const {
    name,
    images,
    artists,
    href,
    releaseDate,
    releaseDatePrecision,
    tracks,
    copyrights,
    label,
  } = await getAlbum({
    id,
  })

  const options: Intl.DateTimeFormatOptions = {
    month: releaseDatePrecision === 'year' ? undefined : 'long',
    day: releaseDatePrecision === 'day' ? 'numeric' : undefined,
    year: 'numeric',
  }

  const dateOfRelease = new Date(releaseDate).toLocaleString('EN-en', options)

  const numberOfDiscs = Math.max(...tracks.map(track => track.discNumber))

  const discTracks = []

  for (let index = 1; index <= numberOfDiscs; index++) {
    discTracks.push(
      tracks
        .filter(track => track.discNumber === index)
        .sort(
          (firstTrack, secondTrack) =>
            firstTrack.trackNumber - secondTrack.trackNumber
        )
    )
  }

  return (
    <div className="flex w-full flex-col gap-8 p-12">
      <ItemHeaderSection
        name={name}
        images={images}
        artists={artists}
        href={href}
      >
        <>
          <div>
            Release date: {dateOfRelease} &bull; {label}
          </div>

          {copyrights.map((copyright, index) => (
            <span className="text-sm" key={index}>
              {copyright}
            </span>
          ))}
        </>
      </ItemHeaderSection>

      <div className="flex w-full flex-col gap-4">
        <div className="text-4xl">Tracks</div>

        {discTracks.map((disc, index) => (
          <div key={index} className="flex flex-col gap-4">
            {numberOfDiscs > 1 && (
              <div className="flex items-center gap-2 text-xl">
                <FaCompactDisc />
                Disc {index + 1}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-4">
              {disc.map((track, index) => (
                <div
                  key={index}
                  className="flex w-full flex-row items-center justify-between gap-4 rounded-xl bg-neutral-800 p-2 px-4"
                >
                  <div className="flex flex-row items-center gap-3 pt-0">
                    <span className="w-[25px] text-center text-xl">
                      {track.trackNumber}
                    </span>

                    <div className="grid justify-center">
                      <Link
                        href={`/track/${track.id}`}
                        className="truncate text-xl hover:underline"
                      >
                        {track.name}
                      </Link>

                      <ItemArtists artists={track.artists} />
                    </div>
                  </div>

                  <SpotifyLink href={track.href} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
