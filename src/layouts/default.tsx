import { ReactNode } from 'react'

import { Footer } from '~/components/footer'
import { NavigationBar } from '~/components/navigation-bar'

export interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex flex-column justify-content-between gap-4 min-h-screen">
      <NavigationBar />

      <main>{children}</main>

      <Footer />
    </div>
  )
}
