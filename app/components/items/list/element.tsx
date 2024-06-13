'use client'

import { ItemImage } from '../image'
import { ItemArtists } from '../artists'

import {
  ItemsListElementPosition,
  type ItemsListElementPositionProps,
} from './element-position'

import type { ArtistEntity, TrackArtist } from '@app/api/types'
import { ButtonLink } from '@app/components/button-link'
import { SpotifyLink, RelativeTime } from '@app/components/common'
import { cn } from '@app/utils/cn'

export interface ItemsListElementProps {
  id: string
  name: string
  image: string
  href?: string
  artists?: TrackArtist[] | ArtistEntity[]
  playedAt?: string
  position?: number
  positionSize?: ItemsListElementPositionProps['size']
  positionClassName?: string
  externalId?: string
}

export function ItemsListElement({
  id,
  name,
  image,
  href,
  position,
  positionSize,
  positionClassName,
  artists,
  playedAt,
  externalId,
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

        <ItemImage src={image} alt={name} width={48} height={48} />

        <div className="flex flex-col items-start w-full overflow-hidden">
          {externalId ? (
            <ButtonLink
              href={`/${artists ? 'track' : 'artist'}/${id}`}
              className="p-0 leading-5 inline-grid"
            >
              <h3 className="text-xl md:text-2xl truncate">{name}</h3>
            </ButtonLink>
          ) : (
            <span className="truncate">{name}</span>
          )}

          <div className="flex justify-between w-full items-center">
            {artists && <ItemArtists artists={artists} />}

            {playedAt && (
              <RelativeTime value={playedAt} className="text-sm md:text-md" />
            )}
          </div>
        </div>
      </header>

      <div className="self-end min-w-[22px]">
        <SpotifyLink href={href} />
      </div>
    </div>
  )
}
