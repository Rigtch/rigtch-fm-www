// import { Navbar } from 'flowbite-react'
import { ReactNode } from 'react'

export interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div>
      {/* <Navbar fluid rounded>
        <Navbar.Brand>Rigtch</Navbar.Brand>
      </Navbar> */}

      <main className="py-8">{children}</main>
    </div>
  )
}
