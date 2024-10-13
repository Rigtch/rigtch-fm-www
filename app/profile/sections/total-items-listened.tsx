import type { ItemsSection } from './items-section'

import type { ItemType } from '@app/api/types'

namespace TotalItemsListened {
  export type Props = Readonly<
    Required<Pick<ItemsSection.Props, 'total'>> & {
      itemType: ItemType
    }
  >
}

function TotalItemsListened({ total, itemType }: TotalItemsListened.Props) {
  return (
    <div className="flex h-full flex-wrap items-center gap-2">
      <span className="text-3xl font-semibold leading-5">
        {new Intl.NumberFormat('en-EN').format(total)}
      </span>
      <span className="text-xl">{itemType}s listened</span>
    </div>
  )
}

export { TotalItemsListened }
