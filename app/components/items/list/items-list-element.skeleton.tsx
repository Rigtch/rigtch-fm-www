import { ItemImageSkeleton, ItemPosition } from '../misc'

import { SpotifyLink } from '@app/components/common'
import { Skeleton } from '@app/components/ui/skeleton'
import { cn } from '@app/utils/cn'

namespace ItemsListElementSkeleton {
  export interface Props {
    withArtists?: boolean
    withPlayedAt?: boolean
    position?: number
    positionSize?: ItemPosition.Props['size']
    positionClassName?: string
    withPlaysOrPlayTime?: boolean
  }
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
        'flex flex-row justify-between p-2 gap-2 md:gap-4 h-[72px]',
        withPlayedAt && 'md:pl-4 px-4'
      )}
    >
      <header className="flex flex-row items-center gap-4 w-full">
        {!withPlayedAt && position && (
          <ItemPosition
            position={position}
            size={positionSize}
            className={positionClassName}
          />
        )}

        <ItemImageSkeleton className="min-w-[48px] h-[48px]" />

        <div className="flex flex-col w-full gap-2 overflow-hidden">
          <Skeleton className="w-[12rem] h-[1.5rem] mt-[5px]" />

          <div className="flex justify-between w-full items-center">
            <div>
              {withArtists && <Skeleton className="w-[5rem] h-[1rem]" />}
            </div>

            <div className="flex flex-row gap-3 items-center">
              {withPlaysOrPlayTime && (
                <Skeleton className="w-[4rem] h-[1rem]" />
              )}

              {withPlayedAt && <Skeleton className="w-[6rem] h-[1rem]" />}

              <SpotifyLink isDisabled />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export { ItemsListElementSkeleton }
