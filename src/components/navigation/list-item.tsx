'use client'

import { ComponentProps } from 'react'

import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@components/ui/navigation-menu'
import { cn } from '@utils/cn'

export type NavigationListItemProps = ComponentProps<typeof NavigationMenuLink>

export function NavigationListItem({
  children,
  className,
  ...props
}: NavigationListItemProps) {
  return (
    <NavigationMenuLink
      className={cn(
        navigationMenuTriggerStyle(),
        className,
        'cursor-pointer rounded-none w-full m-0 whitespace-nowrap justify-start'
      )}
      {...props}
    >
      {children}
    </NavigationMenuLink>
  )
}
