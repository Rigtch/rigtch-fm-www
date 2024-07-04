'use client'

import { FaStar } from 'react-icons/fa6'
import type { Simplify } from 'type-fest'
import prettyMilliseconds from 'pretty-ms'

import { GenreBadge } from '../genre'
import { ItemArtists, ItemImage, ItemName, ItemPosition } from '../misc'
import type { PlayTimeOrPlaysProps } from '../props'

import type { AlbumEntity, ArtistEntity } from '@app/api/types'
import { cn } from '@app/utils/cn'
import { ProgressWithValueLabel } from '@app/components/common'

export type ItemTopCardTrackAlbumOrArtistProps =
  | (Pick<ArtistEntity, 'images' | 'genres'> & {
      artists?: never
      album?: never
    })
  | {
      images?: never
      genres?: never
      artists: Pick<ArtistEntity, 'id' | 'name'>[]
      album: Pick<AlbumEntity, 'images'>
    }
  | (Pick<AlbumEntity, 'images' | 'genres'> & {
      album?: never
      artists: Pick<ArtistEntity, 'id' | 'name'>[]
    })

export type ItemTopCardProps = Simplify<
  ItemTopCardTrackAlbumOrArtistProps &
    PlaytimeOrPlaysProps &
    Pick<ArtistEntity, 'id' | 'name' | 'href'> & {
      position?: number
      isCarousel?: boolean
    }
>

export function ItemTopCard({
  id,
  name,
  images,
  position,
  genres,
  artists,
  album,
  isCarousel,
  playtime,
  maxPlaytime,
  plays,
  maxPlays,
}: ItemTopCardProps) {
  const stars = [1, 2, 3, 2, 1]

  return (
    <div
      className={cn(
        'w-full flex flex-col justify-start gap-2 h-full relative',
        !isCarousel && position === 1 && '-top-16 lg:-top-24',
        !isCarousel && position === 2 && '-top-8 lg:-top-12'
      )}
    >
      <header className="w-full flex flex-col gap-2 items-center p-0 m-0">
        <div
          style={{
            backgroundImage: 'linear-gradient(to top right, #9400d5, #1e89ee)',
          }}
          className="p-1 rounded-xl"
        >
          <ItemImage images={images ?? album} alt={name} size={164} />
        </div>

        <div className="flex flex-col items-center">
          <ItemName
            name={name}
            href={`/${artists ? (album ? 'track' : 'album') : 'artist'}/${id}`}
            className="text-2xl"
          />

          {artists && <ItemArtists artists={artists} className="text-xl" />}
        </div>

        <div className="flex flex-col justify-center items-center gap-4 w-full">
          {position && <ItemPosition position={position} size="xl" />}

          {genres && (
            <div
              className={cn(
                'flex gap-2 flex-wrap justify-center h-full',
                isCarousel ? 'flex-col' : 'flex-row'
              )}
            >
              {genres.slice(0, 3).map((genre, index) => (
                <GenreBadge key={index} genre={genre} />
              ))}
            </div>
          )}

          <div className="flex flex-row gap-1 mt-4 w-full justify-center">
            {!playtime &&
              !plays &&
              stars.map((size, index) => (
                <FaStar
                  key={index}
                  className={cn(
                    position === 1
                      ? 'text-yellow-600'
                      : position === 2
                        ? 'text-slate-400'
                        : 'text-yellow-900'
                  )}
                  style={{
                    fontSize: `${size * 14}px`,
                    marginTop: `-${size * 4}px`,
                  }}
                />
              ))}

            {plays && (
              <ProgressWithValueLabel
                value={plays}
                max={maxPlays}
                label={`${plays} ${plays > 1 ? 'plays' : 'play'}`}
                animate
              />
            )}

            {playtime && (
              <ProgressWithValueLabel
                value={playtime}
                max={maxPlaytime}
                label={prettyMilliseconds(playtime)}
                animate
              />
            )}
          </div>
        </div>
      </header>
    </div>
  )
}
