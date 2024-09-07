'use client'

import type { ComponentProps } from 'react'

import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'

import { cn } from '@app/utils/cn'

namespace NavigationListItem {
  export type Props = ComponentProps<typeof NavigationMenuLink>
}

function NavigationListItem({
  children,
  className,
  ...props
}: NavigationListItem.Props) {
  return (
    <NavigationMenuLink
      className={cn(
        navigationMenuTriggerStyle(),
        className,
        'm-0 w-full cursor-pointer justify-start whitespace-nowrap rounded-none'
      )}
      {...props}
    >
      {children}
    </NavigationMenuLink>
  )
}

export { NavigationListItem }
