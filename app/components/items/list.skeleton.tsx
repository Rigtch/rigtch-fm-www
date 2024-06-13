'use client'

import { TopItemCardSkeleton } from './top-card.skeleton'
import { ItemSkeleton } from './item.skeleton'

import { Separator } from '@app/components/ui/separator'
import { View } from '@app/types'

export interface ItemsListSkeletonProps {
  view?: View
  withoutPosition?: boolean
  artists?: boolean
  playedAt?: boolean
  genres?: boolean
}

export function ItemsListSkeleton({
  view,
  withoutPosition,
  playedAt,
  artists,
  genres,
}: ItemsListSkeletonProps) {
  return (
    <div className="flex flex-col gap-8">
      {view === View.CARD && (
        <>
          <div className="flex flex-col md:flex-row self-center items-center md:items-start justify-center gap-4 pt-4 mt-16 lg:mt-24 w-full">
            <div className="flex flex-col-reverse md:flex-row justify-center gap-4 md:w-2/3 h-full">
              {[2, 1].map((position, index) => (
                <TopItemCardSkeleton
                  key={index}
                  position={position}
                  artists={artists}
                  genres={genres}
                />
              ))}
            </div>

            <div className="md:w-1/3 h-full">
              <TopItemCardSkeleton
                position={3}
                artists={artists}
                genres={genres}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 7 })
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <ItemSkeleton
                    position={index + 4}
                    artists={artists}
                    withoutPosition={withoutPosition}
                    playedAt={playedAt}
                  />

                  {index !== 10 - 4 && <Separator />}
                </div>
              ))}
          </div>
        </>
      )}

      {view === View.LIST && (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 10 })
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <ItemSkeleton
                  position={index + 1}
                  artists={artists}
                  withoutPosition={withoutPosition}
                  playedAt={playedAt}
                />

                {index !== 10 - 1 && <Separator />}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
