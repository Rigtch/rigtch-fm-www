import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@app/utils/cn'

namespace DefaultSection {
  export type Props = Readonly<
    HTMLAttributes<HTMLDivElement> & {
      title: string
      headerAction?: ReactNode
    }
  >
}

function DefaultSection({
  title,
  headerAction,
  children,
  className,
  ...props
}: DefaultSection.Props) {
  return (
    <section className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-4xl">{title}</h2>

        {headerAction && <div>{headerAction}</div>}
      </header>

      {children && (
        <main className={cn('flex flex-col gap-4', className)} {...props}>
          {children}
        </main>
      )}
    </section>
  )
}

export { DefaultSection }
