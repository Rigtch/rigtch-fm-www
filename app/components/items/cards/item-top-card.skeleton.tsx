'use client'

import { FaStar } from 'react-icons/fa6'

import { ItemImageSkeleton } from '../misc'

import { cn } from '@app/utils/cn'
import { Skeleton } from '@app/components/ui/skeleton'

namespace ItemTopCardSkeleton {
  export interface Props {
    position?: number
    withGenres?: boolean
    withArtists?: boolean
    withProgress?: boolean
  }
}

function ItemTopCardSkeleton({
  position,
  withGenres,
  withArtists,
  withProgress,
}: ItemTopCardSkeleton.Props) {
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
        <div className="p-1 rounded-xl bg-card">
          <ItemImageSkeleton className="w-[164px] h-[164px]" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <Skeleton className="w-[12rem] h-[30px]" />

          {withArtists && <Skeleton className="w-[6rem] h-[25px]" />}
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
          <span className="text-center text-5xl">{position}</span>

          {withGenres && (
            <div className="flex flex-row gap-2 flex-wrap justify-center h-full max-w-full">
              <Skeleton className="w-[4rem] h-[1rem] rounded-pill" />
              <Skeleton className="w-[6rem] h-[1rem] rounded-pill" />
              <Skeleton className="w-[5rem] h-[1rem] rounded-pill" />
            </div>
          )}

          <div className="flex flex-row gap-1 mt-4 w-full">
            {withProgress ? (
              <Skeleton className="w-full h-7 rounded-full" />
            ) : (
              stars.map((size, index) => (
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
              ))
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

export { ItemTopCardSkeleton }
