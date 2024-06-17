import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

import { Button } from '../../ui/button'

import { cn } from '@app/utils/cn'

export interface LinkButtonProps extends LinkProps {
  children: ReactNode
  className?: string
}

export function LinkButton({ children, className, ...props }: LinkButtonProps) {
  return (
    <Button
      variant="link"
      asChild
      className={cn('leading-none p-0 text-lg', className)}
    >
      <Link {...props}>{children}</Link>
    </Button>
  )
}
