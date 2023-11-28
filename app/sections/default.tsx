import { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@app/utils/cn'

export interface DefaultSectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  headerAction?: ReactNode
}

export function DefaultSection({
  title,
  headerAction,
  children,
  className,
  ...props
}: DefaultSectionProps) {
  return (
    <section className="flex flex-col gap-8 mb-6 md:mb-12 lg:mb-24">
      <header className="flex justify-between">
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
