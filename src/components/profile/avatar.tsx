'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { ComponentProps } from 'react'

import { cn } from '@utils/cn'

export interface ProfileAvatarProps extends ComponentProps<typeof Avatar> {
  src?: string
  fallback?: string
  size?: 'sm' | 'lg'
}

export function ProfileAvatar({
  src,
  fallback,
  className,
  size = 'sm',
  ...props
}: ProfileAvatarProps) {
  return (
    <Avatar
      {...props}
      className={cn(
        'flex bg-primary rounded-full',
        size === 'sm' && 'w-[48px] h-[48px]',
        size === 'lg' && 'w-[128px] h-[128px]',
        className
      )}
    >
      <AvatarImage className="rounded-full" src={src} />

      <AvatarFallback
        className={cn(
          'text-black  w-full h-full flex items-center justify-center text-primary-foreground',
          size === 'sm' && 'text-xl',
          size === 'lg' && 'text-5xl'
        )}
      >
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}
