import { Image } from 'primereact/image'
import { Card } from 'primereact/card'
import { DateTime } from 'luxon'

import { OpenInSpotifyButton } from './common'

import { Track } from '~/graphql/types'
import { getImage } from '~/utils/get-image'
import { getArtists } from '~/utils/get-artists'
import { isMobile } from '~/utils/is-mobile'

export type TrackCardProps = Omit<Track, 'progress' | 'duration'>

export function TrackCard({
  name,
  artists,
  album,
  href,
  playedAt,
}: TrackCardProps) {
  return (
    <Card
      className="surface-ground"
      onClick={() => isMobile() && window.open(href, '_blank')}
    >
      <main className="justify-content-between flex-column flex gap-1 md:flex-row">
        <header className="flex gap-4">
          <Image
            src={getImage(album.images)}
            alt={album.name}
            width="64"
            height="64"
            imageClassName="border-round-md"
          />

          <div className="flex-column justify-content-center flex">
            <div className="m-0 text-xl text-white">{name}</div>
            <div className="text-700 m-0">{getArtists(artists)}</div>
          </div>
        </header>

        <div className="flex-column justify-content-between align-items-end flex">
          <OpenInSpotifyButton href={href} className="hidden md:block" />

          <p className="text-700 m-0">
            {DateTime.fromISO(playedAt ?? '').toRelative()}
          </p>
        </div>
      </main>
    </Card>
  )
}
