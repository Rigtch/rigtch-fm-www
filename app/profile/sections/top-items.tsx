'use client'

import { ItemsSectionProps } from './items'

import { DefaultSection } from '@app/sections'
import { ItemsList } from '@app/components/items'
import { View } from '@app/types'

export interface TopItemsSectionProps extends ItemsSectionProps {
  view: View
}

export function TopItemsSection({
  title,
  items,
  children,
  view,
  ...props
}: TopItemsSectionProps) {
  return (
    <DefaultSection title={title} {...props}>
      <ItemsList items={items} isTop={view === View.CARD} />

      {children}
    </DefaultSection>
  )
}
