'use client'

import {
  LinkButton,
  type LinkButtonProps,
} from '@app/components/common/buttons'
import { cn } from '@app/utils/cn'
import type { AlbumEntity } from '@app/api/types'

export interface ItemNameProps
  extends Pick<AlbumEntity, 'name'>,
    Pick<LinkButtonProps, 'className'> {
  href: string
}

export function ItemName({ name, href, className }: ItemNameProps) {
  return (
    <LinkButton href={href} className="justify-start">
      <span className={cn('truncate max-w-[200px]', className)}>{name}</span>
    </LinkButton>
  )
}
