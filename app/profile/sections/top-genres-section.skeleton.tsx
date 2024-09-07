import { Skeleton } from '@app/components/ui/skeleton'
import { DefaultSection } from '@app/sections'

namespace TopGenresSectionSkeleton {
  export interface Props {
    length?: number
  }
}

function TopGenresSectionSkeleton({
  length = 50,
}: TopGenresSectionSkeleton.Props) {
  return (
    <DefaultSection title="Top Genres" className="gap-12">
      <div className="justify-left flex flex-row flex-wrap gap-2">
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

export { TopGenresSectionSkeleton }
