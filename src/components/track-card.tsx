import { Image } from 'primereact/image'
import { Card } from 'primereact/card'
import { classNames } from 'primereact/utils'

import { OpenInSpotifyButton } from './common'
import { RelativeTime } from './utils'

import { Track } from '~/graphql/types'
import { getImage } from '~/utils/get-image'
import { getArtists } from '~/utils/get-artists'
import { isMobile } from '~/utils/is-mobile'

export type TrackCardProps = Omit<Track, 'progress' | 'duration'> & {
  topTrack?: boolean
  position?: number
}

export function TrackCard({
  name,
  artists,
  album,
  href,
  topTrack,
  position,
  playedAt,
}: TrackCardProps) {
  return (
    <Card
      className="surface-ground"
      onClick={() => isMobile() && window.open(href, '_blank')}
    >
      <main className="justify-content-between flex w-full flex-row gap-3 md:gap-1">
        <header className="align-items-center flex gap-4 md:w-6">
          {topTrack && (
            <span className="w-2rem text-center text-3xl md:text-4xl">
              {position}
            </span>
          )}

          <Image
            src={getImage(album.images)}
            alt={album.name}
            width="64"
            height="64"
            imageClassName="border-round-md"
          />

          <div className="flex-column justify-content-center flex md:w-6">
            <div className="m-0 text-xl text-white">{name}</div>
            <div className="text-400 m-0">{getArtists(artists)}</div>
          </div>
        </header>

        <div
          className={classNames(
            'align-items-end hidden flex-row md:flex md:w-6',
            topTrack ? 'justify-content-between' : 'justify-content-end'
          )}
        >
          {topTrack && (
            <div className="flex-column flex">
              <div className="m-0 text-xl text-white">From album:</div>
              <div className="text-400 m-0">{album.name}</div>
            </div>
          )}

          <div className="flex-column justify-content-between align-items-end flex gap-2">
            <OpenInSpotifyButton href={href} />

            <RelativeTime value={playedAt ?? ''} />
          </div>
        </div>
      </main>
    </Card>
  )
}
