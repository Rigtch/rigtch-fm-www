import { ReactNode } from 'react'
import Image from 'next/image'

import { rigtchLogo } from '~/assets/images'

export interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex flex-column gap-4">
      <header className="flex gap-4 align-items-center p-2 surface-card border-round-sm">
        <Image
          src={rigtchLogo}
          alt="Rigtch"
          width={32}
          className="border-round-sm"
        />

        <span className="font-bold">RIGTCH</span>
      </header>

      <main>{children}</main>
    </div>
  )
}
