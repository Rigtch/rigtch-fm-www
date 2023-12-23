'use client'

import { ItemsListSkeleton } from '../components/items/list-skeleton'

import { ItemsSectionProps } from './items'

import { DefaultSection } from '@app/sections'
import { ItemsList } from '@app/profile/components/items'
import { View } from '@app/types'

export interface TopItemsSectionProps extends ItemsSectionProps {
  view: View
  isFetching?: boolean
  artists?: boolean
}

export function TopItemsSection({
  title,
  items,
  children,
  view,
  isFetching,
  artists,
  ...props
}: TopItemsSectionProps) {
  const sortedItems = items.map((item, index) => ({
    ...item,
    position: index + 1,
  }))

  sortedItems.splice(0, 2, sortedItems[1], sortedItems[0])

  return (
    <DefaultSection title={title} {...props}>
      {isFetching ? (
        <ItemsListSkeleton isTop={view === View.CARD} artists={artists} />
      ) : (
        <ItemsList items={sortedItems} isTop={view === View.CARD} />
      )}

      {children}
    </DefaultSection>
  )
}
