import { Skeleton } from '@app/components/ui/skeleton'
import { DefaultSection } from '@app/sections'

export interface TopGenresSectionSkeletonProps {
  length?: number
}

export function TopGenresSectionSkeleton({
  length = 50,
}: TopGenresSectionSkeletonProps) {
  return (
    <DefaultSection title="Top Genres" className="gap-12">
      <div className="flex flex-row flex-wrap justify-left gap-2">
        {Array.from({ length: length }).map((_, index) => (
          <div key={index}>
            <Skeleton
              className="h-[40px] rounded-lg"
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
