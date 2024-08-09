'use client'

import type { ArtistEntity } from '@app/api/types'
import { LinkButton } from '@app/components/common/buttons'
import { cn } from '@app/utils/cn'

namespace ItemArtists {
  export interface Props extends Pick<LinkButton.Props, 'className'> {
    artists: Pick<ArtistEntity, 'id' | 'name'>[]
  }
}

function ItemArtists({ artists, className }: ItemArtists.Props) {
  return (
    <span className="truncate">
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
    </span>
  )
}

export { ItemArtists }
