'use client'

import type { HTMLAttributes } from 'react'

import { cn } from '@app/utils/cn'

namespace ItemPosition {
  export type Props = Readonly<
    HTMLAttributes<HTMLSpanElement> & {
      size?: 'sm' | 'md' | 'lg' | 'xl'
      position: number
    }
  >
}

function ItemPosition({
  position,
  className,
  size = 'md',
}: ItemPosition.Props) {
  return (
    <span
      className={cn(
        'w-[2rem] text-center',
        size === 'sm' && 'md:text-md text-sm',
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
