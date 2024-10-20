'use client'

import prettyMilliseconds from 'pretty-ms'
import type { HtmlHTMLAttributes } from 'react'
import { useEffect, useState } from 'react'
import type { Simplify } from 'type-fest'

import { GenreBadge } from '../genre'
import { ItemArtists, ItemImage, ItemPosition, RelativeTime } from '../misc'
import type { PlayTimeOrPlays } from '../types'

import type { AlbumEntity, ArtistEntity } from '@app/api/types'
import { SpotifyLink } from '@app/components/common'
import { LinkButton } from '@app/components/common/buttons'
import { cn } from '@app/utils/cn'

interface ItemsListElementArtist extends Pick<ArtistEntity, 'images'> {
  genres?: string[]
  artists?: never
  album?: never
}

interface ItemsListElementTrack {
  artists: Pick<ArtistEntity, 'id' | 'name'>[]
  album: Pick<AlbumEntity, 'images' | 'id'>
  genres?: never
  images?: never
}

interface ItemsListElementAlbum extends Pick<AlbumEntity, 'images' | 'genres'> {
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
  export type Props = Readonly<
    Simplify<
      PlayedAtOrPosition &
        PlayTimeOrPlays &
        (
          | ItemsListElementAlbum
          | ItemsListElementTrack
          | ItemsListElementArtist
        ) &
        Pick<AlbumEntity, 'name' | 'href' | 'id'> & {
          genresDisplayLength?: number
          hideImage?: boolean
          isHighlighted?: boolean
          prefetchItemsPage?: boolean
          linkScroll?: boolean
        } & Pick<HtmlHTMLAttributes<HTMLDivElement>, 'className'>
    >
  >
}

function ItemsListElement({
  id,
  name,
  images,
  href,
  hideImage,
  position,
  positionSize,
  positionClassName,
  artists,
  playedAt,
  album,
  playTime,
  genres,
  maxPlayTime,
  plays,
  maxPlays,
  className,
  genresDisplayLength = 3,
  isHighlighted,
  prefetchItemsPage,
  linkScroll,
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
    <div
      className={cn(
        'relative overflow-hidden',
        className,
        isHighlighted && 'bg-primary-lighter'
      )}
    >
      {(plays ?? playTime) && (
        <div
          className={cn(
            'absolute -left-[8px] -z-10 h-full -skew-x-12 bg-primary transition-all duration-700 ease-in-out',
            className
          )}
          style={{
            width: `calc(${progressWidth}% + 16px)`,
          }}
        />
      )}

      <div
        className={cn(
          'flex flex-row justify-between gap-2 p-2 md:gap-4',
          !position && 'px-4 md:pl-4'
        )}
      >
        <header className="flex w-full max-w-[calc(100%-30px)] flex-row items-center gap-4">
          {position && (
            <ItemPosition
              position={position}
              size={positionSize}
              className={positionClassName}
            />
          )}

          {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
          {(images ?? !hideImage) && (
            <ItemImage images={images ?? album} alt={name} size={48} />
          )}

          <div className="flex w-full flex-col items-start overflow-hidden">
            <LinkButton
              href={
                album?.id
                  ? `/album/${album.id}?highlighted-track-id=${id}`
                  : `/${artists ? 'album' : 'artist'}/${id}`
              }
              className="inline-grid p-0 leading-5"
              prefetch={prefetchItemsPage}
              scroll={linkScroll}
            >
              <h3 className="truncate text-xl md:text-2xl">{name}</h3>
            </LinkButton>

            <div className="flex w-full items-center justify-between">
              <div>
                {artists && <ItemArtists artists={artists} />}

                <div className="hidden flex-row gap-1 md:flex">
                  {!artists &&
                    genres
                      ?.slice(0, genresDisplayLength)
                      .map((genre, index) => (
                        <GenreBadge key={index} genre={genre} />
                      ))}
                </div>
              </div>

              {playedAt && <RelativeTime value={playedAt} />}

              {playTime && prettyMilliseconds(playTime)}

              {plays && `${plays} ${plays > 1 ? 'plays' : 'play'}`}
            </div>
          </div>
        </header>

        <div className="min-w-[22px] self-end">
          <SpotifyLink href={href} />
        </div>
      </div>
    </div>
  )
}

export { ItemsListElement }
