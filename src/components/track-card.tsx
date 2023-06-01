import { Image } from 'primereact/image'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { DateTime } from 'luxon'

import { Track } from '~/graphql/types'
import { getAlbumImage } from '~/utils/get-album-image'
import { getArtists } from '~/utils/get-artists'

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
      onClick={() => window.innerWidth < 757 && window.open(href, '_blank')}
    >
      <main className="justify-content-between flex-column flex gap-1 md:flex-row">
        <header className="flex gap-4">
          <Image
            src={getAlbumImage(album)}
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
          <Button
            severity="info"
            text
            className="align-self-end hidden text-white md:block"
            onClick={() => window.open(href, '_blank')}
          >
            Open in Spotify
          </Button>

          <p className="text-700 m-0">
            {DateTime.fromISO(playedAt ?? '').toRelative()}
          </p>
        </div>
      </main>
    </Card>
  )
}
