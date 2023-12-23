import { ItemsListSkeleton } from '../components/items/list-skeleton'

import { DefaultSection, DefaultSectionProps } from '@app/sections'
import { Artist, Track } from '@app/api/types'
import { ItemsList } from '@app/profile/components/items'

export type ItemsSectionProps = DefaultSectionProps & {
  items: (Artist | Track)[]
  withoutPosition?: boolean
  isFetching?: boolean
  artists?: boolean
  playedAt?: boolean
}

export function ItemsSection({
  items,
  title,
  children,
  withoutPosition,
  isFetching,
  playedAt,
  artists,
  ...props
}: ItemsSectionProps) {
  return (
    <DefaultSection title={title} {...props}>
      {isFetching ? (
        <ItemsListSkeleton
          withoutPosition={withoutPosition}
          artists={artists}
          playedAt={playedAt}
        />
      ) : (
        <ItemsList items={items} withoutPosition={withoutPosition} />
      )}

      {children}
    </DefaultSection>
  )
}
