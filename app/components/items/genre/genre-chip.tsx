'use client'

import { useEffect, useState } from 'react'

import type { PlaytimeOrPlaysProps } from '../props'

import type { GenreProps } from './props'

import { cn } from '@app/utils/cn'

export type GenreChipProps = GenreProps & PlaytimeOrPlaysProps

export function GenreChip({
  genre,
  className,
  plays,
  maxPlays,
  playtime,
  maxPlaytime,
}: GenreChipProps) {
  const [progressWidth, setProgressWidth] = useState<number>(0)

  useEffect(() => {
    if (plays ?? playtime) {
      setTimeout(() => {
        setProgressWidth(
          ((plays ?? playtime) / (maxPlays ?? maxPlaytime)) * 100
        )
      }, 200)
    }
  }, [plays, playtime, maxPlays, maxPlaytime])

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl w-max -z-10',
        className ?? 'bg-neutral-700'
      )}
    >
      {(plays ?? playtime) && (
        <div
          className="transition-all duration-700 ease-in-out -z-10 absolute bg-primary h-full -skew-x-12 -left-[8px]"
          style={{
            width: `calc(${progressWidth}% + 10px)`,
          }}
        />
      )}

      <div className={cn('p-2 whitespace-nowrap text-white block')}>
        {genre}
      </div>
    </div>
  )
}
