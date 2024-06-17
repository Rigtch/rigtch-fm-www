import { ButtonLink } from '../button-link'

import type { AlbumEntity } from '@app/api/types'

export type ItemNameProps = Pick<AlbumEntity, 'name' | 'id'>

export function ItemName({ name, id }: ItemNameProps) {
  return (
    <ButtonLink href={`/album/${id}`} className="justify-start">
      <span className="truncate max-w-[200px]">{name}</span>
    </ButtonLink>
  )
}
