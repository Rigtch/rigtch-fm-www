'use client'

import { ItemTopCardSkeleton } from '../cards'

import { ItemsListElementSkeleton } from './items-list-element.skeleton'

import { Separator } from '@app/components/ui/separator'
import { View } from '@app/profile/enums'

namespace ItemsListSkeleton {
  export type Props = Readonly<
    Omit<ItemTopCardSkeleton.Props, 'position'> &
      Pick<ItemsListElementSkeleton.Props, 'withPlayedAt'> & {
        view?: View
      }
  >
}

function ItemsListSkeleton({
  view = View.LIST,
  withPlayedAt,
  withArtists,
  withGenres,
  withProgress,
}: ItemsListSkeleton.Props) {
  return (
    <div className="flex flex-col gap-8">
      {view === View.TOP && (
        <>
          <div className="mt-16 flex w-full flex-col items-center justify-center gap-4 self-center pt-4 md:flex-row md:items-start lg:mt-24">
            <div className="flex h-full flex-col-reverse justify-center gap-4 md:w-2/3 md:flex-row">
              {[2, 1].map((position, index) => (
                <ItemTopCardSkeleton
                  key={index}
                  position={position}
                  withArtists={withArtists}
                  withGenres={withGenres}
                  withProgress={withProgress}
                />
              ))}
            </div>

            <div className="h-full md:w-1/3">
              <ItemTopCardSkeleton
                position={3}
                withArtists={withArtists}
                withGenres={withGenres}
                withProgress={withProgress}
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
                    withGenres={withGenres}
                    withArtists={withArtists}
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
                  withGenres={withGenres}
                  withPlayedAt={withPlayedAt}
                  withPlaysOrPlayTime={withProgress}
                />

                {index !== 10 - 1 && <Separator />}
              </div>
            ))}
        </div>
      )}

      {view === View.CARD && (
        <div className="flex flex-col md:flex-row gap-4">
          {Array.from({ length: 10 })
            .fill(0)
            .map((_, index) => (
              <ItemsListElementSkeleton
                key={index}
                withArtists={withArtists}
                withPlayedAt={withPlayedAt}
                withPlaysOrPlayTime={withProgress}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export { ItemsListSkeleton }
