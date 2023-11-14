import { LayoutProps } from '@app/layout'
import { Sidebar } from '@components/sidebar'

export default function ProfileLayout({ children }: LayoutProps) {
  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="my-16 w-full">{children}</div>

      <div />
    </div>
  )
}
