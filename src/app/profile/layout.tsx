import { LayoutProps } from '@app/layout'
import { Sidebar } from '@components/sidebar'

export default function ProfileLayout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="my-8 md:my-16 w-full min-h-[200vh]">{children}</main>
    </div>
  )
}
