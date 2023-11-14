import Link from 'next/link'
import { IconType } from 'react-icons'

import { Button } from '@components/ui/button'

export interface SidebarSectionItemProps {
  label: string
  href: string
  icon?: IconType
  isActive?: boolean
}

export function SidebarSectionItem({
  label,
  href,
  icon: Icon,
  isActive = false,
}: SidebarSectionItemProps) {
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
