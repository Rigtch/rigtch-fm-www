'use client'

import { ItemTopCardSkeleton } from '../cards'

import { ItemsListElementSkeleton } from './items-list-element.skeleton'

import { Separator } from '@app/components/ui/separator'
import { View } from '@app/profile/enums'

namespace ItemsListSkeleton {
  export interface Props {
    view?: View
    withoutPosition?: boolean
    withArtists?: boolean
    withPlayedAt?: boolean
    withGenres?: boolean
  }
}

function ItemsListSkeleton({
  view = View.LIST,
  withoutPosition,
  withPlayedAt,
  withArtists,
  withGenres,
}: ItemsListSkeleton.Props) {
  return (
    <div className="flex flex-col gap-8">
      {view === View.CARD && (
        <>
          <div className="flex flex-col md:flex-row self-center items-center md:items-start justify-center gap-4 pt-4 mt-16 lg:mt-24 w-full">
            <div className="flex flex-col-reverse md:flex-row justify-center gap-4 md:w-2/3 h-full">
              {[2, 1].map((position, index) => (
                <ItemTopCardSkeleton
                  key={index}
                  withPosition={position}
                  withArtists={withArtists}
                  withGenres={withGenres}
                />
              ))}
            </div>

            <div className="md:w-1/3 h-full">
              <ItemTopCardSkeleton
                withPosition={3}
                withArtists={withArtists}
                withGenres={withGenres}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 7 })
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <ItemsListElementSkeleton
                    position={index + 4}
                    withArtists={withArtists}
                    withoutPosition={withoutPosition}
                    withPlayedAt={withPlayedAt}
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
                <ItemsListElementSkeleton
                  position={index + 1}
                  withArtists={withArtists}
                  withoutPosition={withoutPosition}
                  withPlayedAt={withPlayedAt}
                />

                {index !== 10 - 1 && <Separator />}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export { ItemsListSkeleton }
