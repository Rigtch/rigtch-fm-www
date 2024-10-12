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
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-nowrap text-4xl">{title}</h2>

        {headerAction && <div className="self-end">{headerAction}</div>}
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
