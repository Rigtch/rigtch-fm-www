import { ItemImageSkeleton } from './image.skeleton'

import { cn } from '@app/utils/cn'
import { Skeleton } from '@app/components/ui/skeleton'

export interface ItemSkeletonProps {
  artists?: boolean
  playedAt?: boolean
  position?: number
  withoutPosition?: boolean
}

export function ItemSkeleton({
  position,
  artists,
  playedAt,
  withoutPosition,
}: ItemSkeletonProps) {
  return (
    <div
      className={cn(
        'flex flex-row justify-between p-2 gap-2 md:gap-4',
        withoutPosition && 'md:px-4'
      )}
    >
      <header className="flex flex-row items-center gap-4 w-full">
        {!withoutPosition && position && (
          <span className="text-center text-3xl w-[2rem]">{position}</span>
        )}

        <ItemImageSkeleton className="w-[48px] h-[48px]" />

        <div className="flex flex-col w-full gap-2 overflow-hidden">
          <Skeleton className="w-[10rem] h-[1.5rem]" />

          <div className="flex justify-between w-full items-center">
            <div>{artists && <Skeleton className="w-[5rem] h-[1rem]" />}</div>

            {playedAt && <Skeleton className="w-[6rem] h-[1rem]" />}
          </div>
        </div>
      </header>
    </div>
  )
}
