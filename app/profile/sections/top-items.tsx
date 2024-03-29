'use client'

import { ItemsSectionProps } from './items'

import { DefaultSection } from '@app/sections'
import { ItemsList } from '@app/profile/components/items'
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
  const sortedItems = items.map((item, index) => ({
    ...item,
    position: index + 1,
  }))

  sortedItems.splice(0, 2, sortedItems[1], sortedItems[0])

  return (
    <DefaultSection title={title} {...props}>
      <ItemsList items={sortedItems} isTop={view === View.CARD} />

      {children}
    </DefaultSection>
  )
}
