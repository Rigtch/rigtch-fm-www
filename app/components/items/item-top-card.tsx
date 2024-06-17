'use client'

import { FaStar } from 'react-icons/fa6'

import { ItemImage } from './item-image'
import { ItemName } from './item-name'
import { ItemArtists } from './item-artists'
import { ItemPosition } from './item-position'

import type { AlbumEntity, ArtistEntity, TrackEntity } from '@app/api/types'
import { Badge } from '@app/components/ui/badge'
import { cn } from '@app/utils/cn'

export type ItemTopCardConditionalProps =
  | (Pick<ArtistEntity, 'images' | 'genres'> & {
      artists?: never
      album?: never
    })
  | (Pick<TrackEntity, 'artists' | 'album'> & {
      images?: never
      genres?: never
    })
  | (Pick<AlbumEntity, 'images' | 'genres' | 'artists'> & {
      album?: never
    })

export type ItemTopCardProps = ItemTopCardConditionalProps &
  Pick<ArtistEntity, 'id' | 'name'> & {
    position?: number
  }

export function ItemTopCard({
  id,
  name,
  images,
  position,
  genres,
  artists,
  album,
}: ItemTopCardProps) {
  const stars = [1, 2, 3, 2, 1]

  return (
    <div
      className={cn(
        'w-full flex flex-col justify-start gap-2 h-full relative',
        position === 1 && '-top-16 lg:-top-24',
        position === 2 && '-top-8 lg:-top-12'
      )}
    >
      <header className="w-full flex flex-col gap-2 items-center p-0">
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

        <div className="flex flex-col justify-center items-center gap-4">
          {position && <ItemPosition position={position} size="xl" />}

          {genres && (
            <div className="flex flex-row gap-2 flex-wrap justify-center h-full">
              {genres.slice(0, 3).map((genre, index) => (
                <Badge key={index} className="text-primary-foreground/80">
                  {genre}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex flex-row gap-1 mt-4">
            {stars.map((size, index) => (
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
          </div>
        </div>
      </header>
    </div>
  )
}
