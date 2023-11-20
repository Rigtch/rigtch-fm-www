import { ReactNode } from 'react'

export interface DefaultSectionProps {
  title: string
  headerAction?: ReactNode
  children?: ReactNode
}

export function DefaultSection({
  title,
  headerAction,
  children,
}: DefaultSectionProps) {
  return (
    <section className="flex flex-col gap-8 mb-6 md:mb-12 lg:mb-24">
      <header className="flex justify-between">
        <h2 className="text-5xl">{title}</h2>

        <div>{headerAction}</div>
      </header>

      <main className="flex flex-col gap-4">{children}</main>
    </section>
  )
}
