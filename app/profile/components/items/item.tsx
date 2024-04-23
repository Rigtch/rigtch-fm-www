'use client'

import { ItemImage } from './image'

import { OpenInSpotifyButton, RelativeTime } from '@app/components/common'
import { ArtistEntity, TrackArtist } from '@app/api/types'
import { cn } from '@app/utils/cn'
import { ButtonLink } from '@app/components/button-link'

export interface ItemProps {
  id: string
  name: string
  image: string
  href?: string
  artists?: TrackArtist[] | ArtistEntity[]
  playedAt?: string
  position?: number
  externalId?: string
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
          <span className="text-center text-3xl w-[2rem]">{position}</span>
        )}

        <ItemImage src={image} alt={name} width={48} height={48} />

        <div className="flex flex-col w-full overflow-hidden">
          <h3 className="text-xl md:text-2xl leading-5 overflow-hidden text-ellipsis whitespace-nowrap">
            {externalId ? (
              <ButtonLink
                href={`/${artists ? 'track' : 'artist'}/${id}`}
                className="p-0 font-normal text-xl md:text-2xl leading-5 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {name}
              </ButtonLink>
            ) : (
              <>{name}</>
            )}
          </h3>

          <div className="flex justify-between w-full items-center">
            <div>
              {artists?.map(({ name, href, id, ...artist }, index) => (
                <span key={name}>
                  <ButtonLink
                    className="text-primary-foreground/80 h-auto text-md"
                    href={'externalId' in artist ? `/artist/${id}` : href}
                    {...(!('externalId' in artist) && {
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
        <OpenInSpotifyButton href={href ?? ''} />
      </div>
    </div>
  )
}
