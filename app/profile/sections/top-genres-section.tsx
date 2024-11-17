import { NoDataAlert } from '../components/common'

import { TotalItemsListened } from './total-items-listened'

import { GenresList } from '@app/components/items/genre'
import { DefaultSection } from '@app/sections'

namespace TopGenresSection {
  export type Props = Pick<DefaultSection.Props, 'children'> &
    Pick<GenresList.Props, 'items'> & {
      total?: number
    }
}

function TopGenresSection({ items, total, children }: TopGenresSection.Props) {
  return (
    <DefaultSection
      title="Top Genres"
      className="gap-4"
      headerAction={
        total && <TotalItemsListened total={total} itemType="genre" />
      }
    >
      <GenresList items={items} />

      {items.length === 0 && <NoDataAlert />}

      <div className="flex justify-center">{children}</div>
    </DefaultSection>
  )
}

export { TopGenresSection }
