import { SpotifyLink } from '../common'
import { Card } from '../ui/card'

import { ItemImage } from './item-image'
import { ItemName } from './item-name'
import { ItemArtists } from './item-artists'

import type { AlbumEntity, ArtistEntity } from '@app/api/types'

export type ItemCardConditionalProps =
  | (Pick<AlbumEntity, 'images' | 'albumType' | 'releaseDate'> & {
      artists?: Pick<ArtistEntity, 'id' | 'name'>[]
      album?: never
    })
  | {
      artists: Pick<ArtistEntity, 'id' | 'name'>[]
      album: Pick<AlbumEntity, 'images'>
      images?: never
      albumType?: never
      releaseDate?: never
    }
  | (Pick<ArtistEntity, 'images'> & {
      artists?: never
      album?: never
      albumType?: never
      releaseDate?: never
    })

export type ItemCardProps = ItemCardConditionalProps &
  Pick<AlbumEntity, 'name' | 'href' | 'id'>

export function ItemCard({
  id,
  name,
  href,
  releaseDate,
  albumType,
  images,
  artists,
  album,
}: ItemCardProps) {
  return (
    <Card className="p-4 bg-neutral-800 rounded-lg flex flex-col gap-3">
      <ItemImage images={images ?? album} alt={name} size={200} />

      <div>
        <ItemName
          name={name}
          href={`/${artists ? (album ? 'track' : 'album') : 'artist'}/${id}`}
        />

        <div className="flex flex-row justify-between">
          {albumType && (
            <div>
              {new Date(releaseDate).getFullYear()} &bull;&nbsp;
              <span className="capitalize">{albumType}</span>
            </div>
          )}

          {album && <ItemArtists artists={artists} />}

          {/* Fix `SpotifyLink` flex position */}
          {!album && !albumType && <div />}

          <SpotifyLink href={href} />
        </div>
      </div>
    </Card>
  )
}
