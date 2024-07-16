'use client'

import type { HTMLAttributes } from 'react'

import { cn } from '@app/utils/cn'

namespace ItemPosition {
  export interface Props extends HTMLAttributes<HTMLSpanElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    position: number
  }
}

function ItemPosition({
  position,
  className,
  size = 'md',
}: ItemPosition.Props) {
  return (
    <span
      className={cn(
        'text-center w-[2rem]',
        size === 'sm' && 'text-sm md:text-md',
        size === 'md' && 'text-xl',
        size === 'lg' && 'text-3xl',
        size === 'xl' && 'text-5xl',
        className
      )}
    >
      {position}
    </span>
  )
}

export { ItemPosition }
