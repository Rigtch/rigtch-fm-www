import { Button } from '@material-tailwind/react'

export interface InfiniteLoadingButtonProps {
  refFunction: (node?: Element | null | undefined) => void
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  hasNextPage?: boolean
}

export function InfiniteLoadingButton({
  refFunction,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: InfiniteLoadingButtonProps) {
  return (
    <Button
      ref={refFunction}
      onClick={() => fetchNextPage()}
      // loading={isFetchingNextPage}
      disabled={!hasNextPage}
      color="blue"
    >
      {isFetchingNextPage
        ? 'Loading more...'
        : hasNextPage
        ? 'Load more'
        : 'Nothing more to load'}
    </Button>
  )
}
