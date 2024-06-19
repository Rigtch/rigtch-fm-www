'use client'

import type { ComponentProps } from 'react'

import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'

import { cn } from '@app/utils/cn'

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
