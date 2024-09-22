'use client'

import prettyMilliseconds from 'pretty-ms'
import type { HtmlHTMLAttributes } from 'react'

import { GenreBadge } from '../genre'
import { ItemArtists, ItemImage, ItemName, ItemPosition } from '../misc'
import type { PlayTimeOrPlays } from '../types'

import { ItemTopCardStars } from './top-item-card-stars'

import type { AlbumEntity, ArtistEntity } from '@app/api/types'
import { ProgressWithValueLabel } from '@app/components/common'
import { cn } from '@app/utils/cn'

interface ItemTopCardAlbum extends Pick<AlbumEntity, 'images' | 'genres'> {
  artists?: never
  album?: never
}

interface ItemTopCardTrack {
  artists: Pick<ArtistEntity, 'id' | 'name'>[]
  album: Pick<AlbumEntity, 'images'>
  images?: never
  genres?: never
}

interface ItemTopCardArtist extends Pick<ArtistEntity, 'images' | 'genres'> {
  artists: Pick<ArtistEntity, 'id' | 'name'>[]
  album?: never
}

namespace ItemTopCard {
  export type Props = PlayTimeOrPlays &
    Pick<ArtistEntity, 'id' | 'name' | 'href'> &
    (ItemTopCardAlbum | ItemTopCardTrack | ItemTopCardArtist) & {
      position?: number
      isCarousel?: boolean
    } & Pick<HtmlHTMLAttributes<HTMLDivElement>, 'className'>
}

function ItemTopCard({
  id,
  name,
  images,
  position,
  genres,
  artists,
  album,
  isCarousel,
  playTime,
  maxPlayTime,
  plays,
  maxPlays,
  className,
}: ItemTopCard.Props) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col justify-start gap-2',
        !isCarousel && position === 1 && '-top-16 lg:-top-24',
        !isCarousel && position === 2 && '-top-8 lg:-top-12',
        className
      )}
    >
      <header className="m-0 flex w-full flex-col items-center gap-2 p-0">
        <div
          style={{
            backgroundImage: 'linear-gradient(to top right, #9400d5, #1e89ee)',
          }}
          className="rounded-xl p-1"
        >
          <ItemImage images={images ?? album} alt={name} size={164} priority />
        </div>

        <div className="flex flex-col items-center">
          <ItemName
            name={name}
            href={`/${artists ? (album ? 'track' : 'album') : 'artist'}/${id}`}
            className="text-2xl"
          />

          {artists && <ItemArtists artists={artists} className="text-xl" />}
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4">
          {position && <ItemPosition position={position} size="xl" />}

          {genres && genres.length > 0 && (
            <div
              className={cn(
                'flex h-full flex-wrap justify-center gap-2',
                isCarousel ? 'flex-col' : 'flex-row'
              )}
            >
              {genres.slice(0, 3).map((genre, index) => (
                <GenreBadge key={index} genre={genre} />
              ))}
            </div>
          )}

          <div className="mt-4 flex w-full flex-row justify-center gap-1">
            {!playTime && !plays && position && (
              <ItemTopCardStars position={position} />
            )}

            {plays && (
              <ProgressWithValueLabel
                value={plays}
                max={maxPlays}
                label={`${plays} ${plays > 1 ? 'plays' : 'play'}`}
                animate
              />
            )}

            {playTime && (
              <ProgressWithValueLabel
                value={playTime}
                max={maxPlayTime}
                label={prettyMilliseconds(playTime)}
                animate
              />
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

export { ItemTopCard }
