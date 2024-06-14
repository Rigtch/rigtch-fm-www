import type { HTMLAttributes } from 'react'

import { cn } from '@app/utils/cn'

export interface ItemsListElementPositionProps
  extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg'
  position: number
}

export function ItemsListElementPosition({
  position,
  className,
  size = 'md',
}: ItemsListElementPositionProps) {
  return (
    <span
      className={cn(
        'text-center w-[2rem]',
        size === 'sm' && 'text-sm md:text-md',
        size === 'md' && 'text-xl',
        size === 'lg' && 'text-3xl',
        className
      )}
    >
      {position}
    </span>
  )
}
