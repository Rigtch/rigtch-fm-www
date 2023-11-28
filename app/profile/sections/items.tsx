import { DefaultSection, DefaultSectionProps } from '@app/sections'
import { Artist, Track } from '@app/api/types'
import { ItemsList } from '@app/profile/components/items'

export type ItemsSectionProps = DefaultSectionProps & {
  items: (Artist | Track)[]
  withoutPosition?: boolean
}

export function ItemsSection({
  items,
  title,
  children,
  withoutPosition,
}: ItemsSectionProps) {
  return (
    <DefaultSection title={title}>
      <ItemsList items={items} withoutPosition={withoutPosition} />

      {children}
    </DefaultSection>
  )
}
