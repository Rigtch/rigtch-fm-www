'use client'

import Image from 'next/image'
import { Suspense } from 'react'

import { Avatar, AvatarFallback } from '@app/components/ui/avatar'
import { cn } from '@app/utils/cn'

namespace ProfileAvatar {
  export type Props = Readonly<{
    className?: string
    src?: string | null
    displayName?: string
    size?: 'sm' | 'lg'
  }>
}

function ProfileAvatar({
  src,
  displayName,
  className,
  size = 'sm',
}: ProfileAvatar.Props) {
  const sizeInPx = size === 'sm' ? 48 : 128

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
        {src ? (
          <Suspense
            fallback={
              <AvatarFallback
                className={cn(
                  'flex h-full w-full items-center justify-center bg-primary text-primary-foreground',
                  size === 'sm' && 'text-xl',
                  size === 'lg' && 'text-5xl'
                )}
              >
                {displayName?.slice(0, 1)}
              </AvatarFallback>
            }
          >
            <Image
              src={src}
              alt={displayName ?? ''}
              width={sizeInPx}
              height={sizeInPx}
              priority
            />
          </Suspense>
        ) : (
          <AvatarFallback
            className={cn(
              'flex h-full w-full items-center justify-center bg-primary text-primary-foreground',
              size === 'sm' && 'text-xl',
              size === 'lg' && 'text-5xl'
            )}
          >
            {displayName?.slice(0, 1)}
          </AvatarFallback>
        )}
      </Avatar>
    </span>
  )
}

export { ProfileAvatar }
