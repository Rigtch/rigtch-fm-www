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
        size === 'sm' && 'w-[48px] h-[48px]',
        size === 'lg' && 'w-[128px] h-[128px]'
      )}
    />
  )
}

export { ProfileAvatarSkeleton }
