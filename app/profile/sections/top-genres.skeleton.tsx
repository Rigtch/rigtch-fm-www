import { Skeleton } from '@app/components/ui/skeleton'
import { DefaultSection } from '@app/sections'

export interface TopGenresSkeletonProps {
  length?: number
}

export function TopGenresSkeleton({ length = 50 }: TopGenresSkeletonProps) {
  return (
    <DefaultSection title="Top Genres" className="gap-12 items-center">
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {Array.from({ length: length }).map((_, index) => (
          <div key={index}>
            <Skeleton className="w-[8rem] h-[2rem] rounded-lg" />
          </div>
        ))}
      </div>
    </DefaultSection>
  )
}
