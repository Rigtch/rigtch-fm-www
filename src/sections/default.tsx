import { ReactNode } from 'react'

export interface DefaultSectionProps {
  title: string
  children?: ReactNode
}

export function DefaultSection({ title, children }: DefaultSectionProps) {
  return (
    <section className="flex flex-col gap-8 mb-6 md:mb-12 lg:mb-24">
      <header>
        <h2 className="text-5xl">{title}</h2>
      </header>

      <main className="flex flex-col gap-4">{children}</main>
    </section>
  )
}
