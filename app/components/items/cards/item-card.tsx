'use client'

import { ItemArtists, ItemImage, ItemName } from '../misc'

import type { AlbumEntity, ArtistEntity, TrackEntity } from '@app/api/types'
import { SpotifyLink } from '@app/components/common'
import { Card } from '@app/components/ui/card'
import { cn } from '@app/utils/cn'

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
    <Card className="flex w-full flex-col gap-3 rounded-lg bg-neutral-800 p-4">
      <ItemImage images={images ?? album} alt={name} size={200} />

      <div
        className={cn(!album && !artists && 'flex flex-row justify-between')}
      >
        <ItemName
          name={name}
          href={`/${artists ? (album ? 'track' : 'album') : 'artist'}/${id}`}
          className="!max-w-[200px]"
        />

        {(album ?? albumType) ? (
          <div className="flex flex-row justify-between">
            {albumType && (
              <div>
                {new Date(releaseDate).getFullYear()} &bull;&nbsp;
                <span className="capitalize">{albumType}</span>
              </div>
            )}

            {album && (
              <div className="flex max-w-[150px] justify-start">
                <ItemArtists artists={artists} />
              </div>
            )}

            {(album ?? artists) && <SpotifyLink href={href} />}
          </div>
        ) : (
          <SpotifyLink href={href} />
        )}
      </div>
    </Card>
  )
}

export { ItemCard }
