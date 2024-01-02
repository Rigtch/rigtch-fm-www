import { Skeleton } from '@app/components/ui/skeleton'
import { DefaultSection } from '@app/sections'

export function AnalysisSkeleton() {
  return (
    <DefaultSection title="Analysis">
      <div className="flex flex-col md:flex-row md:justify-around flex-wrap gap-8 px-4 py-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2 md:w-1/4">
            <Skeleton className="w-[4rem] h-[1rem]" />

            <Skeleton className="w-full h-[1rem] rounded-xl" />
          </div>
        ))}
      </div>
    </DefaultSection>
  )
}
