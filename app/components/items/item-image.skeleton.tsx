import { Skeleton } from '@app/components/ui/skeleton'

export interface ItemImageSkeletonProps {
  className?: string
}

export function ItemImageSkeleton({ className }: ItemImageSkeletonProps) {
  return <Skeleton className={className} />
}
