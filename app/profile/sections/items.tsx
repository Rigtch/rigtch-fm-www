import { DefaultSection, DefaultSectionProps } from '@app/sections'
import { ArtistEntity, TrackEntity } from '@app/api/types'
import { ItemsList } from '@app/components/items'

export type ItemsSectionProps = DefaultSectionProps & {
  items: (ArtistEntity | TrackEntity)[]
  withoutPosition?: boolean
}

export function ItemsSection({
  items,
  title,
  children,
  withoutPosition,
  ...props
}: ItemsSectionProps) {
  return (
    <DefaultSection title={title} {...props}>
      <ItemsList items={items} withoutPosition={withoutPosition} />

      {children}
    </DefaultSection>
  )
}
