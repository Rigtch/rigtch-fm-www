import { ItemImageSkeleton } from '../misc/item-image.skeleton'
import { ItemPosition, ItemPositionProps } from '../misc/item-position'

import { cn } from '@app/utils/cn'
import { Skeleton } from '@app/components/ui/skeleton'

export interface ItemsListElementSkeletonProps {
  artists?: boolean
  playedAt?: boolean
  position?: number
  positionSize?: ItemPositionProps['size']
  positionClassName?: string
  withoutPosition?: boolean
}

export function ItemsListElementSkeleton({
  position,
  positionSize,
  positionClassName,
  withoutPosition,
  artists,
  playedAt,
}: ItemsListElementSkeletonProps) {
  return (
    <div
      className={cn(
        'flex flex-row justify-between p-2 gap-2 md:gap-4 h-[72px]',
        withoutPosition && 'md:px-4'
      )}
    >
      <header className="flex flex-row items-center gap-4 w-full">
        {!withoutPosition && position && (
          <ItemPosition
            position={position}
            size={positionSize}
            className={positionClassName}
          />
        )}

        <ItemImageSkeleton className="min-w-[48px] h-[48px]" />

        <div className="flex flex-col w-full gap-2 overflow-hidden">
          <Skeleton className="w-[16rem] h-[1.5rem]" />

          <div className="flex justify-between w-full items-center">
            <div>{artists && <Skeleton className="w-[6rem] h-[1rem]" />}</div>

            {playedAt && <Skeleton className="w-[4rem] h-[1rem]" />}
          </div>
        </div>
      </header>
    </div>
  )
}
