import { Skeleton } from '@app/components/ui/skeleton'

export interface ItemImageProps {
  className?: string
}

export function ItemImageSkeleton({ className }: ItemImageProps) {
  return <Skeleton className={className} />
}
