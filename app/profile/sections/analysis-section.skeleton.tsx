import { Skeleton } from '@app/components/ui/skeleton'
import { DefaultSection } from '@app/sections'

export function AnalysisSectionSkeleton() {
  return (
    <DefaultSection title="Analysis">
      <div className="flex flex-col flex-wrap gap-8 px-4 py-6 md:flex-row md:justify-around">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2 md:w-1/4">
            <Skeleton className="h-[1rem] w-[4rem]" />

            <Skeleton className="h-[1rem] w-full rounded-xl" />
          </div>
        ))}
      </div>
    </DefaultSection>
  )
}
