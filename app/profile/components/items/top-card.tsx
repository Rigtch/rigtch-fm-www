'use client'

import { FaStar } from 'react-icons/fa6'

import { ItemImage } from './image'

import { Badge } from '@app/components/ui/badge'
import { TrackArtist } from '@app/api/types'
import { cn } from '@app/utils/cn'
import { formatArtists } from '@app/profile/utils/formatters'

export interface TopItemCardProps {
  name: string
  image: string
  position?: number
  genres?: string[]
  artists?: TrackArtist[]
}

export function TopItemCard({
  name,
  image,
  position,
  genres,
  artists,
}: TopItemCardProps) {
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
          <ItemImage src={image} alt={name} width={164} height={164} />
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-center">{name}</h3>

          {artists && (
            <h4 className="text-xl text-primary-foreground/80">
              {formatArtists(artists)}
            </h4>
          )}
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
          <span className="text-center text-5xl">{position}</span>

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
