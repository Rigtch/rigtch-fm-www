import { NoDataAlert } from '../components/common'

import { TotalItemsListened } from './total-items-listened'

import { DefaultSection } from '@app/sections'
import type {
  AlbumEntity,
  ArtistEntity,
  ItemType,
  RigtchStatsResponse,
  TrackEntity,
} from '@app/api/types'
import { ItemsList } from '@app/components/items/list'
import { View } from '@app/profile/enums'

namespace ItemsSection {
  export type Props = Readonly<
    Omit<DefaultSection.Props, 'headerAction'> & {
      view: View
      total?: number
    } & {
      items:
        | ArtistEntity[]
        | TrackEntity[]
        | RigtchStatsResponse<ArtistEntity | TrackEntity | AlbumEntity>
    }
  >
}

function ItemsSection({
  items,
  children,
  view = View.LIST,
  total,
  ...props
}: ItemsSection.Props) {
  const itemType: Exclude<ItemType, 'genre'> = items.every(
    item => 'item' in item
  )
    ? items.every(item => 'album' in item.item)
      ? 'track'
      : items.every(item => 'artists' in item.item)
        ? 'album'
        : 'artist'
    : items.every(item => 'album' in item)
      ? 'track'
      : items.every(item => 'artists' in item)
        ? 'album'
        : 'artist'

  return (
    <DefaultSection
      {...props}
      headerAction={
        total && <TotalItemsListened total={total} itemType={itemType} />
      }
    >
      {items.length > 0 && (
        <ItemsList items={items} isTop={view === View.CARD} />
      )}

      {items.length === 0 && <NoDataAlert />}

      <div className="flex justify-center">{children}</div>
    </DefaultSection>
  )
}

export { ItemsSection }
