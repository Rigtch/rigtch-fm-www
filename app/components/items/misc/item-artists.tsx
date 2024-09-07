'use client'

import { LinkButton } from '@app/components/common/buttons'
import { cn } from '@app/utils/cn'
import type { ArtistEntity } from '@app/api/types'

namespace ItemArtists {
  export interface Props extends Pick<LinkButton.Props, 'className'> {
    artists: Pick<ArtistEntity, 'id' | 'name'>[]
  }
}

function ItemArtists({ artists, className }: ItemArtists.Props) {
  return (
    <>
      {artists.map(({ name, id }, index) => (
        <span key={name}>
          <LinkButton
            className={cn(
              'h-auto text-primary-foreground/80',
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

export { ItemArtists }
