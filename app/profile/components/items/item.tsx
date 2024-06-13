'use client'

import { ItemImage } from './image'

import { ArtistEntity, TrackArtist } from '@app/api/types'
import { ButtonLink } from '@app/components/button-link'
import { SpotifyLink, RelativeTime } from '@app/components/common'
import { cn } from '@app/utils/cn'
import { isEntity } from '@app/utils/is-entity'

export interface ItemProps {
  id: string
  name: string
  image: string
  href?: string
  artists?: TrackArtist[] | ArtistEntity[]
  playedAt?: string
  position?: number
  externalId?: string
  positionClassName?: string
}

export function Item({
  id,
  name,
  image,
  href,
  position,
  artists,
  playedAt,
  externalId,
  positionClassName,
}: ItemProps) {
  return (
    <div
      className={cn(
        'flex flex-row justify-between p-2 gap-2 md:gap-4 h-[72px]',
        !position && 'md:px-4'
      )}
    >
      <header className="flex flex-row items-center gap-4 w-full max-w-[calc(100%-30px)]">
        {position && (
          <span
            className={cn(
              'text-center w-[2rem]',
              positionClassName ?? 'text-3xl'
            )}
          >
            {position}
          </span>
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
            <div>
              {artists?.map(({ name, href, id, ...artist }, index) => (
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
            </div>

            {playedAt && (
              <RelativeTime value={playedAt} className="text-sm md:text-md" />
            )}
          </div>
        </div>
      </header>

      <div className="self-end min-w-[22px]">
        <SpotifyLink href={href ?? ''} />
      </div>
    </div>
  )
}
