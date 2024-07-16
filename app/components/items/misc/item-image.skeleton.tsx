import type { HTMLAttributes } from 'react'

import { Skeleton } from '@app/components/ui/skeleton'

namespace ItemImageSkeleton {
  export type Props = Pick<HTMLAttributes<HTMLDivElement>, 'className'>
}

function ItemImageSkeleton({ className }: ItemImageSkeleton.Props) {
  return <Skeleton className={className} />
}

export { ItemImageSkeleton }
