import { HTMLAttributes } from 'react'

import { Footer } from '@components/footer'
import { NavigationBar } from '@components/navigation-bar'

export function DefaultLayout({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex-col justify-between items-center flex min-h-screen gap-4"
      style={{
        minHeight: '100vh',
      }}
    >
      <NavigationBar />

      <main className="flex-grow-1 self-center w-full p-1 md:p-2 max-w-screen-2xl">
        {children}
      </main>

      <Footer />
    </div>
  )
}
