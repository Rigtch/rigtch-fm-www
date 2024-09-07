import { Skeleton } from '@app/components/ui/skeleton'
import { cn } from '@app/utils/cn'

namespace ProfileAvatarSkeleton {
  export interface Props {
    size?: 'sm' | 'lg'
  }
}

function ProfileAvatarSkeleton({ size = 'sm' }: ProfileAvatarSkeleton.Props) {
  return (
    <Skeleton
      className={cn(
        'rounded-full',
        size === 'sm' && 'h-[48px] w-[48px]',
        size === 'lg' && 'h-[128px] w-[128px]'
      )}
    />
  )
}

export { ProfileAvatarSkeleton }
