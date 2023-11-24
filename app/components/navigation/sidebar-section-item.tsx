import Link from 'next/link'
import { IconType } from 'react-icons'

import { Button } from '../ui/button'

export interface NavigationSidebarSectionItemProps {
  label: string
  href: string
  icon?: IconType
  pathname?: string
}

export function NavigationSidebarSectionItem({
  label,
  href,
  icon: Icon,
  pathname,
}: NavigationSidebarSectionItemProps) {
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
