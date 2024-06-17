'use client'

import { ItemImage } from '../image'
import { ItemArtists } from '../artists'
import { RelativeTime } from '../relative-time'

import {
  ItemsListElementPosition,
  type ItemsListElementPositionProps,
} from './element-position'

import type { AlbumEntity, ArtistEntity } from '@app/api/types'
import { ButtonLink } from '@app/components/button-link'
import { SpotifyLink } from '@app/components/common'
import { cn } from '@app/utils/cn'
import { getImage } from '@app/utils/get-image'

export type ItemsListElementPlayedAtOrPositionProps =
  | {
      playedAt: string
      position?: never
      positionSize?: never
      positionClassName?: never
    }
  | {
      position: number
      positionSize?: ItemsListElementPositionProps['size']
      positionClassName?: string
      playedAt?: never
    }

export type ItemsListElementAlbumOrImagesProps =
  | {
      album: Pick<AlbumEntity, 'images'>
      artists: Pick<ArtistEntity, 'id' | 'name'>[]
      images?: never
    }
  | {
      images: Pick<AlbumEntity, 'images'>
      artists: Pick<ArtistEntity, 'id' | 'name'>[]
      album?: never
    }
  | {
      images: Pick<ArtistEntity, 'images'>
      album?: never
      artists?: never
    }

export type ItemsListElementProps = ItemsListElementPlayedAtOrPositionProps &
  ItemsListElementAlbumOrImagesProps &
  Pick<AlbumEntity, 'name' | 'href' | 'id'>

export function ItemsListElement({
  id,
  name,
  images,
  href,
  position,
  positionSize,
  positionClassName,
  artists,
  playedAt,
  album,
}: ItemsListElementProps) {
  return (
    <div
      className={cn(
        'flex flex-row justify-between p-2 gap-2 md:gap-4 h-[72px]',
        !position && 'md:px-4'
      )}
    >
      <header className="flex flex-row items-center gap-4 w-full max-w-[calc(100%-30px)]">
        {position && (
          <ItemsListElementPosition
            position={position}
            size={positionSize}
            className={positionClassName}
          />
        )}

        <ItemImage
          src={getImage(images ?? album, 48)}
          alt={name}
          width={48}
          height={48}
        />

        <div className="flex flex-col items-start w-full overflow-hidden">
          <ButtonLink
            href={`/${artists ? 'track' : 'artist'}/${id}`}
            className="p-0 leading-5 inline-grid"
          >
            <h3 className="text-xl md:text-2xl truncate">{name}</h3>
          </ButtonLink>

          <div className="flex justify-between w-full items-center">
            {artists && <ItemArtists artists={artists} />}

            {playedAt && <RelativeTime value={playedAt} />}
          </div>
        </div>
      </header>

      <div className="self-end min-w-[22px]">
        <SpotifyLink href={href} />
      </div>
    </div>
  )
}
