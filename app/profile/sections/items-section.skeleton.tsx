import { ItemsListSkeleton } from '@app/components/items/list'
import { DefaultSection } from '@app/sections'

namespace ItemsSectionSkeleton {
  export type Props = Readonly<
    ItemsListSkeleton.Props & {
      title: string
    }
  >
}

function ItemsSectionSkeleton({ title, ...props }: ItemsSectionSkeleton.Props) {
  return (
    <DefaultSection title={title}>
      <ItemsListSkeleton {...props} />
    </DefaultSection>
  )
}

export { ItemsSectionSkeleton }
