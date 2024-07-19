'use client'

import { LinkButton } from '@app/components/common/buttons'
import { cn } from '@app/utils/cn'
import type { AlbumEntity } from '@app/api/types'

export interface ItemNameProps
  extends Pick<AlbumEntity, 'name'>,
    Pick<LinkButton.Props, 'className'> {
  href: string
}

export function ItemName({ name, href, className }: ItemNameProps) {
  return (
    <LinkButton href={href} className="flex justify-start">
      <p
        className={cn(
          'truncate max-w-[220px] sm:max-w-[240px] xl:max-w-[340px]',
          className
        )}
      >
        {name}
      </p>
    </LinkButton>
  )
}
