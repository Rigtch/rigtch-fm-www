import Link from 'next/link'
import type { IconType } from 'react-icons'

import { Button } from '../ui/button'

import { cn } from '@app/utils/cn'

namespace SidebarSectionItem {
  export type Props = Readonly<{
    label: string
    href: string
    icon?: IconType
    isDisabled?: boolean
    pathname?: string
  }>
}

function SidebarSectionItem({
  label,
  href,
  icon: Icon,
  isDisabled,
  pathname,
}: SidebarSectionItem.Props) {
  const isActive = pathname === href.split('?')[0]

  return (
    <Button
      variant={isActive ? 'secondary' : 'ghost'}
      asChild
      className={cn(
        'text-md w-full justify-start',
        isDisabled && 'cursor-default opacity-50'
      )}
      disabled={isDisabled}
    >
      <Link
        href={isDisabled ? '' : href}
        className="flex gap-2"
        prefetch
        aria-disabled={isDisabled}
      >
        {Icon && <Icon />}
        {label}
      </Link>
    </Button>
  )
}

export { SidebarSectionItem }
