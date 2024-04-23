'use client'

import Link from 'next/link'

import { ItemImage } from './image'

import { OpenInSpotifyButton, RelativeTime } from '@app/components/common'
import { Button } from '@app/components/ui/button'
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
                  <Button
                    key={name}
                    variant="link"
                    className="text-md leading-none text-primary-foreground/80 p-0 h-auto"
                    asChild
                  >
                    {'externalId' in artist ? (
                      <Link href={`/artist/${id}`}>{name}</Link>
                    ) : (
                      <Link href={href} replace target="_blank">
                        {name}
                      </Link>
                    )}
                  </Button>

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
