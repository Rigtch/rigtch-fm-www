import { ButtonLink } from '../button-link'

import type { ArtistEntity } from '@app/api/types'

export interface ItemArtistProps {
  artists: Pick<ArtistEntity, 'id' | 'name'>[]
}

export function ItemArtists({ artists }: ItemArtistProps) {
  return (
    <div>
      {artists.map(({ name, id }, index) => (
        <span key={name}>
          <ButtonLink
            className="text-primary-foreground/80 h-auto text-md"
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
