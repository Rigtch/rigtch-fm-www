import { FaCompactDisc } from 'react-icons/fa'

import { ItemHeaderSection } from '@app/(items)/sections'
import { getAlbum } from '@app/api/fetchers/items'
import { ItemsList } from '@app/components/items/list'
import { HIGHLIGHTED_TRACK_ID } from '@app/profile/constants'
import type { PageWithIdParamProps } from '@app/types'
import { validateId } from '@app/utils/validators'

export type AlbumPageProps = Readonly<PageWithIdParamProps> & {
  searchParams: {
    [HIGHLIGHTED_TRACK_ID]?: string
  }
}

export default async function AlbumPage({
  params,
  searchParams,
}: AlbumPageProps) {
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
  } = await getAlbum({ id })

  const highlightedTrackId = validateId(searchParams[HIGHLIGHTED_TRACK_ID])

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

            <ItemsList
              items={disc}
              highlightedTrackId={highlightedTrackId}
              hideImage
            />
          </div>
        ))}
      </div>
    </div>
  )
}
