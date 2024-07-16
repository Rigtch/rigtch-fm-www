import { NoDataAlert } from '../components/common'

import { DefaultSection } from '@app/sections'
import type {
  AlbumEntity,
  ArtistEntity,
  RigtchStatsResponse,
  TrackEntity,
} from '@app/api/types'
import { ItemsList } from '@app/components/items/list'
import { View } from '@app/profile/enums'

namespace ItemsSection {
  export type Props = DefaultSection.Props & {
    items:
      | ArtistEntity[]
      | TrackEntity[]
      | RigtchStatsResponse<ArtistEntity | TrackEntity | AlbumEntity>
    view: View
  }
}

function ItemsSection({
  items,
  title,
  children,
  view = View.LIST,
  ...props
}: ItemsSection.Props) {
  return (
    <DefaultSection title={title} {...props}>
      {items.length > 0 && (
        <ItemsList items={items} isTop={view === View.CARD} />
      )}

      {items.length === 0 && <NoDataAlert />}

      {children}
    </DefaultSection>
  )
}

export { ItemsSection }
