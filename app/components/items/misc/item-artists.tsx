'use client'

import { ButtonLink, ButtonLinkProps } from '../../button-link'

import { cn } from '@app/utils/cn'
import type { ArtistEntity } from '@app/api/types'

export interface ItemArtistProps extends Pick<ButtonLinkProps, 'className'> {
  artists: Pick<ArtistEntity, 'id' | 'name'>[]
}

export function ItemArtists({ artists, className }: ItemArtistProps) {
  return (
    <div>
      {artists.map(({ name, id }, index) => (
        <span key={name}>
          <ButtonLink
            className={cn(
              'text-primary-foreground/80 h-auto',
              className ?? 'text-md'
            )}
            href={`/artist/${id}`}
          >
            {name}
          </ButtonLink>

          {index !== artists.length - 1 && <span>, </span>}
        </span>
      ))}
    </div>
  )
}
