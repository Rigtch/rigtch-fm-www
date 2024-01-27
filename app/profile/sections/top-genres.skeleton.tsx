import { Skeleton } from '@app/components/ui/skeleton'
import { DefaultSection } from '@app/sections'

export interface TopGenresSkeletonProps {
  length?: number
}

export function TopGenresSkeleton({ length = 50 }: TopGenresSkeletonProps) {
  return (
    <DefaultSection title="Top Genres" className="gap-12">
      <div className="flex flex-row flex-wrap justify-left gap-2">
        {Array.from({ length: length }).map((_, index) => (
          <div key={index}>
            <Skeleton
              className="h-[2rem] rounded-lg"
              style={{
                width: `${Math.floor(Math.random() * (10 - 6) + 6)}rem`,
              }}
            />
          </div>
        ))}
      </div>
    </DefaultSection>
  )
}
