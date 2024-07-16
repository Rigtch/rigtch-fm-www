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
        'cursor-pointer rounded-none w-full m-0 whitespace-nowrap justify-start'
      )}
      {...props}
    >
      {children}
    </NavigationMenuLink>
  )
}

export { NavigationListItem }
