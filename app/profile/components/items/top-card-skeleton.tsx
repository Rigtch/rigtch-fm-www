'use client'

import { FaStar } from 'react-icons/fa6'

import { ItemImageSkeleton } from './image-skeleton'

import { cn } from '@app/utils/cn'
import { Skeleton } from '@app/components/ui/skeleton'

export interface TopItemCardSkeletonProps {
  position?: number
  genres?: boolean
  artists?: boolean
}

export function TopItemCardSkeleton({
  position,
  genres,
  artists,
}: TopItemCardSkeletonProps) {
  const stars = [1, 2, 3, 2, 1]

  return (
    <div
      className={cn(
        'w-full flex flex-col justify-start gap-2 h-full relative',
        position === 1 && '-top-16 lg:-top-24',
        position === 2 && '-top-8 lg:-top-12'
      )}
    >
      <header className="w-full flex flex-col gap-2 items-center p-0">
        <div
          style={{
            backgroundImage: 'linear-gradient(to top right, #9400d5, #1e89ee)',
          }}
          className="p-1 rounded-xl"
        >
          <ItemImageSkeleton className="w-[164px] h-[164px]" />
        </div>

        <div className="flex flex-col items-center">
          <Skeleton className="w-[7rem] h-[1.5rem]" />

          {artists && <Skeleton className="w-[6rem] h-[1rem]" />}
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
          <span className="text-center text-5xl">{position}</span>

          {genres && (
            <div className="flex flex-row gap-2 flex-wrap justify-center h-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-[6rem] h-[1rem] rounded-pill"
                />
              ))}
            </div>
          )}

          <div className="flex flex-row gap-1 mt-4">
            {stars.map((size, index) => (
              <FaStar
                key={index}
                className={cn(
                  position === 1
                    ? 'text-yellow-600'
                    : position === 2
                      ? 'text-slate-400'
                      : 'text-yellow-900'
                )}
                style={{
                  fontSize: `${size * 14}px`,
                  marginTop: `-${size * 4}px`,
                }}
              />
            ))}
          </div>
        </div>
      </header>
    </div>
  )
}
