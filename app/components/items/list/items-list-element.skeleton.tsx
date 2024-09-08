import { ItemImageSkeleton, ItemPosition } from '../misc'

import { SpotifyLink } from '@app/components/common'
import { Skeleton } from '@app/components/ui/skeleton'
import { cn } from '@app/utils/cn'

namespace ItemsListElementSkeleton {
  export type Props = Readonly<{
    withArtists?: boolean
    withPlayedAt?: boolean
    position?: number
    positionSize?: ItemPosition.Props['size']
    positionClassName?: string
    withPlaysOrPlayTime?: boolean
  }>
}

function ItemsListElementSkeleton({
  position,
  positionSize,
  positionClassName,
  withArtists,
  withPlayedAt,
  withPlaysOrPlayTime,
}: ItemsListElementSkeleton.Props) {
  return (
    <div
      className={cn(
        'flex h-[72px] flex-row justify-between gap-2 p-2 md:gap-4',
        withPlayedAt && 'px-4 md:pl-4'
      )}
    >
      <header className="flex w-full flex-row items-center gap-4">
        {!withPlayedAt && position && (
          <ItemPosition
            position={position}
            size={positionSize}
            className={positionClassName}
          />
        )}

        <ItemImageSkeleton className="h-[48px] min-w-[48px]" />

        <div className="flex w-full flex-col gap-2 overflow-hidden">
          <Skeleton className="mt-[5px] h-[1.5rem] w-[12rem]" />

          <div className="flex w-full items-center justify-between">
            <div>
              {withArtists && <Skeleton className="h-[1rem] w-[5rem]" />}
            </div>

            <div className="flex flex-row items-center gap-3">
              {withPlaysOrPlayTime && (
                <Skeleton className="h-[1rem] w-[4rem]" />
              )}

              {withPlayedAt && <Skeleton className="h-[1rem] w-[6rem]" />}

              <SpotifyLink isDisabled />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export { ItemsListElementSkeleton }
