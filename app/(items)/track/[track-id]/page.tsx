import Image from 'next/image'

import { TrackPageProps } from '@app/(items)/types'
import { getTrack } from '@app/api/fetchers/get-track'
import { ButtonLink } from '@app/components/button-link'
import { OpenInSpotifyButton } from '@app/components/common'
import { TRACK_ID } from '@app/constants'
import { getImage } from '@app/utils/get-image'
import { validateId } from '@app/utils/validate-id'

export default async function TrackPage({ params }: TrackPageProps) {
  const id = validateId(params[TRACK_ID])

  const {
    name,
    album: { images, ...album },
    artists,
    href,
  } = await getTrack({
    id,
  })

  return (
    <div className="w-full flex md:flex-row flex-col p-12 gap-8">
      <Image
        src={getImage(images, 200)}
        className="rounded-xl md:rounded-md w-full md:h-[200px] md:w-[200px]"
        width="200"
        height="200"
        alt={name}
      />

      <div className="flex flex-col gap-6 justify-center">
        <div className="flex flex-col">
          <span className="text-5xl">{name}</span>

          <div className="flex flex-row gap-2">
            {artists.map(({ name, id }, index) => (
              <ButtonLink
                key={id}
                href={`/artist/${id}`}
                className="text-primary-foreground/80"
              >
                {name}
                {index + 1 < artists.length && ','}
              </ButtonLink>
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 text-xl">
          <OpenInSpotifyButton href={href} />
          From album:
          <ButtonLink href={`/album/${album.id}`}>{album.name}</ButtonLink>
        </div>
      </div>
    </div>
  )
}
