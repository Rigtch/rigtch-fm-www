import { DefaultSection, DefaultSectionProps } from './default'

import { ItemsList } from '@components/item'
import { Artist, Track } from '@api/types'

export type ItemsSectionProps = DefaultSectionProps & {
  items: (Artist | Track)[]
}

export function ItemsSection({ items, title, children }: ItemsSectionProps) {
  return (
    <DefaultSection title={title}>
      <ItemsList items={items} />

      {children}
    </DefaultSection>
  )
}
