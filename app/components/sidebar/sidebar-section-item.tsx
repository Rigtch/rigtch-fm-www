import Link from 'next/link'
import type { IconType } from 'react-icons'

import { Button } from '../ui/button'

export interface SidebarSectionItemProps {
  label: string
  href: string
  icon?: IconType
  pathname?: string
}

export function SidebarSectionItem({
  label,
  href,
  icon: Icon,
  pathname,
}: SidebarSectionItemProps) {
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
