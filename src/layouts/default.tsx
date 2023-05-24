import { ReactNode } from 'react'

export interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div>
      <header>rigtch</header>

      <main>{children}</main>
    </div>
  )
}
