'use client'

import type { AlbumEntity } from '@app/api/types'
import { LinkButton } from '@app/components/common/buttons'
import { cn } from '@app/utils/cn'

namespace ItemName {
  export type Props = Readonly<
    Pick<AlbumEntity, 'name' | 'href'> & Pick<LinkButton.Props, 'className'>
  >
}

function ItemName({ name, href, className }: ItemName.Props) {
  return (
    <LinkButton href={href} className="flex justify-start">
      <p
        className={cn(
          'max-w-[350px] truncate sm:max-w-[400px] md:max-w-[240px] xl:max-w-[340px]',
          className
        )}
      >
        {name}
      </p>
    </LinkButton>
  )
}

export { ItemName }
