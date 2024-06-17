import Link from 'next/link'

import { SpotifyLink } from '../common'
import { Card } from '../ui/card'

import { ItemImage } from './image'
import { ItemName } from './name'
import { ItemArtists } from './artists'

import { AlbumEntity, ArtistEntity } from '@app/api/types'
import { getImage } from '@app/utils/get-image'

export type ItemCardBaseProps = Pick<AlbumEntity, 'name' | 'href' | 'id'>
export type ItemCardConditionalProps =
  | (Pick<AlbumEntity, 'images' | 'albumType' | 'releaseDate'> & {
      artists?: never
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

export type ItemCardProps = ItemCardBaseProps & ItemCardConditionalProps

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
    <Link href={`/album/${id}`}>
      <Card className="p-4 bg-neutral-800 rounded-lg flex flex-col gap-3">
        <ItemImage
          src={getImage(images ?? album, 200)}
          alt={name}
          width="200"
          height="200"
        />

        <div>
          <ItemName name={name} id={id} />

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
    </Link>
  )
}
