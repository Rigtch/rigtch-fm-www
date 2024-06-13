import Image from 'next/image'
import { ComponentProps } from 'react'

import { cn } from '@app/utils/cn'

export function ItemImage({
  src,
  alt,
  width,
  height,
  className,
  ...props
}: ComponentProps<typeof Image>) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('rounded-md', className)}
      style={{
        ...props.style,
        minHeight: `${height}px`,
        maxHeight: `${height}px`,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
        objectFit: 'cover',
      }}
      {...props}
    />
  )
}
