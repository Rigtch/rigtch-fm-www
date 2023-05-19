import { ReactNode } from 'react'

export interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="">
      <main className="py-8 border-2 border-gray-800">{children}</main>
    </div>
  )
}
