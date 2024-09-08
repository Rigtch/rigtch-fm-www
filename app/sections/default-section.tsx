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
    <section className="mb-6 flex flex-col gap-8 px-4 md:mb-12 lg:mb-24">
      <header className="flex items-center justify-between">
        <h2 className="text-5xl">{title}</h2>

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
