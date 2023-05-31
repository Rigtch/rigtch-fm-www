import { ReactNode } from 'react'

import { Footer } from '~/components/footer'
import { NavigationBar } from '~/components/navigation-bar'

export interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex-column justify-content-between align-content-center flex min-h-screen gap-4">
      <NavigationBar />

      <main
        className="flex-grow-1 align-self-center w-full p-2"
        style={{ maxWidth: '1300px' }}
      >
        {children}
      </main>

      <Footer />
    </div>
  )
}
