'use client'

import { GenreProps } from './props'

export function GenreChip({ genre }: GenreProps) {
  return (
    <div className="w-max p-2 rounded-xl whitespace-nowrap bg-neutral-700 text-white">
      {genre}
    </div>
  )
}
