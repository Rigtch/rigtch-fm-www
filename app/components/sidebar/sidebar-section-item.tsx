import Link from 'next/link'
import type { IconType } from 'react-icons'

import { Button } from '../ui/button'

namespace SidebarSectionItem {
  export interface Props {
    label: string
    href: string
    icon?: IconType
    pathname?: string
  }
}

function SidebarSectionItem({
  label,
  href,
  icon: Icon,
  pathname,
}: SidebarSectionItem.Props) {
  const isActive = pathname === href

  return (
    <Button
      variant={isActive ? 'secondary' : 'ghost'}
      asChild
      className="w-full text-md justify-start"
    >
      <Link href={href} className="flex gap-2">
        {Icon && <Icon />}
        {label}
      </Link>
    </Button>
  )
}

export { SidebarSectionItem }
