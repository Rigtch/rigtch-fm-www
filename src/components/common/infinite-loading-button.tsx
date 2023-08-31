import { Button } from 'primereact/button'

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
      // @ts-expect-error Button should be the same type as Element
      ref={refFunction}
      onClick={() => fetchNextPage()}
      loading={isFetchingNextPage}
      disabled={!hasNextPage}
      severity="info"
    >
      {isFetchingNextPage
        ? 'Loading more...'
        : hasNextPage
        ? 'Load more'
        : 'Nothing more to load'}
    </Button>
  )
}
