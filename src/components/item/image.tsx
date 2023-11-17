import Image from 'next/image'
import { ComponentProps } from 'react'

import { cn } from '@utils/cn'

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
        height: `${height}px`,
        width: `${width}px`,
        objectFit: 'cover',
      }}
      {...props}
    />
  )
}