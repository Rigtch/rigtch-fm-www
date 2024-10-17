import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Button } from '@app/components/ui/button'
import { cn } from '@app/utils/cn'

namespace LinkButton {
  export type Props = Readonly<
    LinkProps & {
      children: ReactNode
      className?: string
    }
  >
}

function LinkButton({
  children,
  scroll,
  className,
  ...props
}: LinkButton.Props) {
  return (
    <Button
      variant="link"
      asChild
      className={cn('p-0 text-lg leading-none', className)}
    >
      <Link {...props} scroll={scroll ?? true}>
        {children}
      </Link>
    </Button>
  )
}

export { LinkButton }
