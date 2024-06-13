'use client'

import { FaStar } from 'react-icons/fa6'

import { ItemImage } from './image'

import { ArtistEntity, TrackArtist } from '@app/api/types'
import { ButtonLink } from '@app/components/button-link'
import { Badge } from '@app/components/ui/badge'
import { cn } from '@app/utils/cn'
import { isEntity } from '@app/utils/is-entity'

export interface TopItemCardProps {
  id: string
  name: string
  image: string
  position?: number
  genres?: string[]
  artists?: TrackArtist[] | ArtistEntity[]
  externalId?: string
}

export function TopItemCard({
  id,
  name,
  image,
  position,
  genres,
  artists,
  externalId,
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
          {externalId ? (
            <ButtonLink
              href={`/${artists ? 'track' : 'artist'}/${id}`}
              className="p-0 leading-5"
            >
              <h3 className="text-2xl font-bold text-center truncate w-[80vw] md:w-auto">
                {name}
              </h3>
            </ButtonLink>
          ) : (
            <span className="w-[80vw] md:w-auto truncate">{name}</span>
          )}

          {artists && (
            <h4 className="text-xl text-primary-foreground/80">
              {artists.map(({ name, href, id, ...artist }, index) => (
                <span key={name}>
                  <ButtonLink
                    className="text-primary-foreground/80 h-auto text-md"
                    href={isEntity(artist) ? `/artist/${id}` : href}
                    {...(!isEntity(artist) && {
                      replace: true,
                      target: '_blank',
                    })}
                  >
                    {name}
                  </ButtonLink>

                  {index !== artists.length - 1 && <span>, </span>}
                </span>
              ))}
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
