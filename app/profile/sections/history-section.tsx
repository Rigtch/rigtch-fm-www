'use client'

import { useEffect } from 'react'
import { CgSpinnerAlt } from 'react-icons/cg'
import { useInView } from 'react-intersection-observer'

import { ItemsList } from '@app/components/items/list'
import { useHistoryInfiniteQuery } from '@app/api/hooks'
import type { HistoryTrack, Pagination } from '@app/api/types'
import { Button } from '@app/components/ui/button'
import { DefaultSection } from '@app/sections'

namespace HistorySection {
  export type Props = Readonly<
    Omit<DefaultSection.Props, 'title'> & {
      initialData: Pagination<HistoryTrack>
      limit: number
    }
  >
}

function HistorySection({
  initialData,
  limit = 20,
  ...props
}: HistorySection.Props) {
  const { ref, inView } = useInView()

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useHistoryInfiniteQuery(initialData, limit)

  useEffect(() => {
    if (inView)
      fetchNextPage().catch((error: unknown) => {
        console.error(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <DefaultSection title="History" {...props}>
      <div>
        {data.pages.map(({ data }) => (
          <div className="relative" key={data[0].id}>
            <ItemsList
              items={data.map(({ track, playedAt }) => ({
                ...track,
                playedAt,
              }))}
              lastItemSeparator
            />

            <div ref={ref} className="absolute bottom-1/2" />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => void fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <>
              <CgSpinnerAlt className="mr-2 h-4 w-4 animate-spin" />
              Loading more...
            </>
          ) : hasNextPage ? (
            'Load Newer'
          ) : (
            'Nothing more to load'
          )}
        </Button>
      </div>
    </DefaultSection>
  )
}

export { HistorySection }
