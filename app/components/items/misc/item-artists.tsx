'use client'

import {
  LinkButton,
  type LinkButtonProps,
} from '@app/components/common/buttons'
import { cn } from '@app/utils/cn'
import type { ArtistEntity } from '@app/api/types'

export interface ItemArtistProps extends Pick<LinkButtonProps, 'className'> {
  artists: Pick<ArtistEntity, 'id' | 'name'>[]
}

export function ItemArtists({ artists, className }: ItemArtistProps) {
  return (
    <>
      {artists.map(({ name, id }, index) => (
        <span key={name}>
          <LinkButton
            className={cn(
              'text-primary-foreground/80 h-auto',
              className ?? 'text-md'
            )}
            href={`/artist/${id}`}
          >
            {name}
          </LinkButton>

          {index !== artists.length - 1 && <span>, </span>}
        </span>
      ))}
    </>
  )
}
