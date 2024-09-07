'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

import { cn } from '@app/utils/cn'

namespace ProfileAvatar {
  export interface Props {
    className?: string
    src?: string | null
    displayName?: string
    size?: 'sm' | 'lg'
  }
}

function ProfileAvatar({
  src,
  displayName,
  className,
  size = 'sm',
}: ProfileAvatar.Props) {
  return (
    <span>
      <Avatar
        className={cn(
          'flex rounded-full bg-primary',
          size === 'sm' && 'h-[48px] w-[48px]',
          size === 'lg' && 'h-[128px] w-[128px]',
          className
        )}
      >
        <AvatarImage
          className="rounded-full"
          src={src ?? undefined}
          alt={displayName}
        />

        <AvatarFallback
          className={cn(
            'flex h-full w-full items-center justify-center text-black text-primary-foreground',
            size === 'sm' && 'text-xl',
            size === 'lg' && 'text-5xl'
          )}
        >
          {displayName?.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
    </span>
  )
}

export { ProfileAvatar }
