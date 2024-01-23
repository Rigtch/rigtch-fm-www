import { Skeleton } from '@app/components/ui/skeleton'

export function ProfileCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-24 h-6" />

      <Skeleton className="w-28 h-4" />
    </div>
  )
}
