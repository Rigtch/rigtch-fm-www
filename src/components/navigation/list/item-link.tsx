'use client'

import Link from 'next/link'
import { ComponentProps } from 'react'

import { NavigationListItem, NavigationListItemProps } from './item'

export type NavigationListItemLinkProps = ComponentProps<typeof Link> &
  NavigationListItemProps

export function NavigationListItemLink({
  href,
  label,
  ...props
}: NavigationListItemLinkProps) {
  return (
    <li>
      <Link href={href} passHref {...props}>
        <NavigationListItem label={label} />
      </Link>
    </li>
  )
}
