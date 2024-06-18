import type { DefaultSectionProps } from '@app/sections'
import { DefaultSection } from '@app/sections'
import type { ArtistEntity, TrackEntity } from '@app/api/types'
import { ItemsList } from '@app/components/items/list'
import { View } from '@app/types'

export type ItemsSectionProps = DefaultSectionProps & {
  items: ArtistEntity[] | TrackEntity[]
  view: View
}

export function ItemsSection({
  items,
  title,
  children,
  view = View.LIST,
  ...props
}: ItemsSectionProps) {
  return (
    <DefaultSection title={title} {...props}>
      <ItemsList items={items} isTop={view === View.CARD} />

      {children}
    </DefaultSection>
  )
}
