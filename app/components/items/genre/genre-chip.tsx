'use client'

import type { GenreProps } from './props'

import { cn } from '@app/utils/cn'

export function GenreChip({ genre, className }: GenreProps) {
  return (
    <div
      className={cn(
        'w-max p-2 rounded-xl whitespace-nowrap text-white',
        className ?? 'bg-neutral-700'
      )}
    >
      {genre}
    </div>
  )
}
