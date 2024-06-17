import { ButtonLink, ButtonLinkProps } from '../button-link'

import { cn } from '@app/utils/cn'
import type { AlbumEntity } from '@app/api/types'

export interface ItemNameProps
  extends Pick<AlbumEntity, 'name'>,
    Pick<ButtonLinkProps, 'className'> {
  href: string
}

export function ItemName({ name, href, className }: ItemNameProps) {
  return (
    <ButtonLink href={href} className="justify-start">
      <span className={cn('truncate max-w-[200px]', className)}>{name}</span>
    </ButtonLink>
  )
}
