'use client'

import type { HTMLAttributes } from 'react'

import { cn } from '@app/utils/cn'

export interface ItemPositionProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  position: number
}

export function ItemPosition({
  position,
  className,
  size = 'md',
}: ItemPositionProps) {
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
