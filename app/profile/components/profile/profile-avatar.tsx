'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

import { cn } from '@app/utils/cn'

export interface ProfileAvatarProps {
  className?: string
  src?: string | null
  displayName?: string
  size?: 'sm' | 'lg'
}

export function ProfileAvatar({
  src,
  displayName,
  className,
  size = 'sm',
}: ProfileAvatarProps) {
  return (
    <span>
      <Avatar
        className={cn(
          'flex bg-primary rounded-full',
          size === 'sm' && 'w-[48px] h-[48px]',
          size === 'lg' && 'w-[128px] h-[128px]',
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
            'text-black  w-full h-full flex items-center justify-center text-primary-foreground',
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
