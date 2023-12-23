import { Skeleton } from '@app/components/ui/skeleton'

export function TopGenresSkeleton() {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="w-[8rem] h-[2rem] rounded-lg" />
        </div>
      ))}
    </div>
  )
}
