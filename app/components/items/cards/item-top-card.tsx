'use client'

import prettyMilliseconds from 'pretty-ms'
import { FaStar } from 'react-icons/fa6'

import { GenreBadge } from '../genre'
import { ItemArtists, ItemImage, ItemName, ItemPosition } from '../misc'
import type { PlayTimeOrPlays } from '../props'

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
    }
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
}: ItemTopCard.Props) {
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
            {!playTime &&
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
