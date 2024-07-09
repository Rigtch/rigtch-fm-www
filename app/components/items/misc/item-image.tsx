'use client'

import Image from 'next/image'
import type { ComponentProps } from 'react'

import { cn } from '@app/utils/cn'
import { type ItemWithImages, findImage } from '@app/utils/find-image'

export interface ItemImageProps
  extends Omit<ComponentProps<typeof Image>, 'src'> {
  size: number
  images: ItemWithImages
}

export function ItemImage({
  images,
  alt,
  size,
  className,
  ...props
}: ItemImageProps) {
  return (
    <Image
      {...props}
      src={findImage(images, size)}
      alt={alt}
      width={size}
      height={size}
      className={cn('rounded-md', className)}
      style={{
        ...props.style,
        minHeight: `${size}px`,
        maxHeight: `${size}px`,
        minWidth: `${size}px`,
        maxWidth: `${size}px`,
        objectFit: 'cover',
      }}
    />
  )
}
