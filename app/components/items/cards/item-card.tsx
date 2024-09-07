'use client'

import { ItemImage, ItemName, ItemArtists } from '../misc'

import { Card } from '@app/components/ui/card'
import { SpotifyLink } from '@app/components/common'
import type { AlbumEntity, ArtistEntity, TrackEntity } from '@app/api/types'

interface ItemCardAlbum
  extends Pick<AlbumEntity, 'images' | 'albumType' | 'releaseDate'> {
  artists?: Pick<ArtistEntity, 'id' | 'name'>[]
  album?: never
}

interface ItemCardTrack {
  artists: Pick<TrackEntity, 'id' | 'name'>[]
  album: Pick<AlbumEntity, 'images'>
  images?: never
  albumType?: never
  releaseDate?: never
}

interface ItemCardArtist extends Pick<ArtistEntity, 'images'> {
  artists?: never
  album?: never
  albumType?: never
  releaseDate?: never
}

namespace ItemCard {
  export type Props = Pick<AlbumEntity, 'name' | 'href' | 'id'> &
    (ItemCardAlbum | ItemCardTrack | ItemCardArtist)
}

function ItemCard({
  id,
  name,
  href,
  releaseDate,
  albumType,
  images,
  artists,
  album,
}: ItemCard.Props) {
  return (
    <Card className="flex flex-col gap-3 rounded-lg bg-neutral-800 p-4">
      <ItemImage images={images ?? album} alt={name} size={200} />

      <div>
        <ItemName
          name={name}
          href={`/${artists ? (album ? 'track' : 'album') : 'artist'}/${id}`}
          className="!max-w-[200px]"
        />

        <div className="flex flex-row justify-between">
          <div>
            {albumType && (
              <>
                {new Date(releaseDate).getFullYear()} &bull;&nbsp;
                <span className="capitalize">{albumType}</span>
              </>
            )}
          </div>

          {album && <ItemArtists artists={artists} />}

          <SpotifyLink href={href} />
        </div>
      </div>
    </Card>
  )
}

export { ItemCard }
