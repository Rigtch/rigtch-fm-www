import { ButtonLink } from '../button-link'

import type { TrackArtist, ArtistEntity } from '@app/api/types'
import { isEntity } from '@app/utils/is-entity'

export interface ItemArtistProps {
  artists: TrackArtist[] | ArtistEntity[]
}

export function ItemArtists({ artists }: ItemArtistProps) {
  return (
    <div>
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
    </div>
  )
}
