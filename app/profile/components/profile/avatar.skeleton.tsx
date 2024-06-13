import { Skeleton } from '@app/components/ui/skeleton'
import { cn } from '@app/utils/cn'

export interface ProfileAvatarSkeletonProps {
  size?: 'sm' | 'lg'
}

export function ProfileAvatarSkeleton({
  size = 'sm',
}: ProfileAvatarSkeletonProps) {
  return (
    <Skeleton
      className={cn(
        'rounded-full',
        size === 'sm' && 'w-[48px] h-[48px]',
        size === 'lg' && 'w-[128px] h-[128px]'
      )}
    />
  )
}
