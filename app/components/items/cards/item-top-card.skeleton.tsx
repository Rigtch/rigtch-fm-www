'use client'

import { ItemImageSkeleton } from '../misc'

import { ItemTopCardStars } from './top-item-card-stars'

import { Skeleton } from '@app/components/ui/skeleton'
import { cn } from '@app/utils/cn'

namespace ItemTopCardSkeleton {
  export type Props = Readonly<{
    position?: number
    withGenres?: boolean
    withArtists?: boolean
    withProgress?: boolean
  }>
}

function ItemTopCardSkeleton({
  position,
  withGenres,
  withArtists,
  withProgress,
}: ItemTopCardSkeleton.Props) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col justify-start gap-2',
        position === 1 && '-top-16 lg:-top-24',
        position === 2 && '-top-8 lg:-top-12'
      )}
    >
      <header className="flex w-full flex-col items-center gap-2 p-0">
        <div className="rounded-xl bg-card p-1">
          <ItemImageSkeleton className="h-[164px] w-[164px]" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-[30px] w-[12rem]" />

          {withArtists && <Skeleton className="h-[25px] w-[6rem]" />}
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-center text-5xl">{position}</span>

          {withGenres && (
            <div className="flex h-full max-w-full flex-row flex-wrap justify-center gap-2">
              <Skeleton className="rounded-pill h-[1rem] w-[4rem]" />
              <Skeleton className="rounded-pill h-[1rem] w-[6rem]" />
              <Skeleton className="rounded-pill h-[1rem] w-[5rem]" />
            </div>
          )}

          <div className="mt-4 flex w-full flex-row justify-center gap-1">
            {withProgress ? (
              <Skeleton className="h-7 w-full rounded-full" />
            ) : (
              <ItemTopCardStars position={position ?? 1} />
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

export { ItemTopCardSkeleton }
