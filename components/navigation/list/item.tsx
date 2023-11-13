import { ComponentProps } from 'react'

import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@components/ui/navigation-menu'

export interface NavigationListItemProps
  extends ComponentProps<typeof NavigationMenuLink> {
  label: string
}

export function NavigationListItem({
  label,
  ...props
}: NavigationListItemProps) {
  return (
    <NavigationMenuLink className={navigationMenuTriggerStyle()} {...props}>
      {label}
    </NavigationMenuLink>
  )
}
