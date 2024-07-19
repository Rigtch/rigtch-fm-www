'use client'

import prettyMilliseconds from 'pretty-ms'
import { useEffect, useState } from 'react'
import type { Simplify } from 'type-fest'

import { ItemArtists, ItemImage, ItemPosition, RelativeTime } from '../misc'
import type { PlayTimeOrPlays } from '../types'

import type { AlbumEntity, ArtistEntity } from '@app/api/types'
import { SpotifyLink } from '@app/components/common'
import { LinkButton } from '@app/components/common/buttons'
import { cn } from '@app/utils/cn'

interface ItemsListElementAlbum extends Pick<ArtistEntity, 'images'> {
  artists?: never
  album?: never
}

interface ItemsListElementTrack {
  artists: Pick<ArtistEntity, 'id' | 'name'>[]
  album: Pick<AlbumEntity, 'images'>
  images?: never
}

interface ItemsListElementArtist extends Pick<AlbumEntity, 'images'> {
  artists: Pick<ArtistEntity, 'id' | 'name'>[]
  album?: never
}

type PlayedAtOrPosition =
  | {
      playedAt: string
      position?: never
      positionSize?: never
      positionClassName?: never
    }
  | {
      position: number
      positionSize?: ItemPosition.Props['size']
      positionClassName?: string
      playedAt?: never
    }

namespace ItemsListElement {
  export type Props = Simplify<
    PlayedAtOrPosition &
      PlayTimeOrPlays &
      (ItemsListElementAlbum | ItemsListElementTrack | ItemsListElementArtist) &
      Pick<AlbumEntity, 'name' | 'href' | 'id'>
  >
}

function ItemsListElement({
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
  playTime,
  maxPlayTime,
  plays,
  maxPlays,
}: ItemsListElement.Props) {
  const [progressWidth, setProgressWidth] = useState<number>(0)

  useEffect(() => {
    if (plays ?? playTime) {
      setTimeout(() => {
        setProgressWidth(
          ((plays ?? playTime) / (maxPlays ?? maxPlayTime)) * 100
        )
      }, 200)
    }
  }, [plays, playTime, maxPlays, maxPlayTime])

  return (
    <div className="relative overflow-hidden">
      {(plays ?? playTime) && (
        <div
          className="transition-all duration-700 ease-in-out absolute bg-primary h-full -z-10 -skew-x-12 -left-[8px]"
          style={{
            width: `calc(${progressWidth}% + 16px)`,
          }}
        />
      )}

      <div
        className={cn(
          'flex flex-row justify-between p-2 gap-2 md:gap-4',
          !position && 'md:pl-4'
        )}
      >
        <header className="flex flex-row items-center gap-4 w-full max-w-[calc(100%-30px)]">
          {position && (
            <ItemPosition
              position={position}
              size={positionSize}
              className={positionClassName}
            />
          )}

          <ItemImage images={images ?? album} alt={name} size={48} />

          <div className="flex flex-col items-start w-full overflow-hidden">
            <LinkButton
              href={`/${artists ? 'track' : 'artist'}/${id}`}
              className="p-0 leading-5 inline-grid"
            >
              <h3 className="text-xl md:text-2xl truncate">{name}</h3>
            </LinkButton>

            <div className="flex justify-between w-full items-center">
              <div>{artists && <ItemArtists artists={artists} />}</div>

              {playedAt && <RelativeTime value={playedAt} />}

              {playTime && prettyMilliseconds(playTime)}

              {plays && `${plays} ${plays > 1 ? 'plays' : 'play'}`}
            </div>
          </div>
        </header>

        <div className="self-end min-w-[22px]">
          <SpotifyLink href={href} />
        </div>
      </div>
    </div>
  )
}

export { ItemsListElement }
