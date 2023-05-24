import { ReactNode } from 'react'

import { NavigationBar } from '~/components/navigation-bar'

export interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex flex-column gap-4">
      <NavigationBar />

      <main>{children}</main>
    </div>
  )
}
