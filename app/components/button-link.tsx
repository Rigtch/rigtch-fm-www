import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

import { Button } from './ui/button'

import { cn } from '@app/utils/cn'

export interface ButtonLinkProps extends LinkProps {
  children: ReactNode
  className?: string
}

export function ButtonLink({ children, className, ...props }: ButtonLinkProps) {
  return (
    <Button
      variant="link"
      asChild
      className={cn(
        'leading-none p-0 text-lg text-primary-foreground/80',
        className
      )}
    >
      <Link {...props}>{children}</Link>
    </Button>
  )
}
