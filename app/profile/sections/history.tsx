'use client'

import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { CgSpinnerAlt } from 'react-icons/cg'

import { ItemsList } from '../components/items'

import { useHistoryInfiniteQuery } from '@app/api/hooks'
import { HistoryTrack, Pagination } from '@app/api/types'
import { DefaultSection, DefaultSectionProps } from '@app/sections'
import { Button } from '@app/components/ui/button'

export type HistorySectionProps = Omit<DefaultSectionProps, 'title'> & {
  initialData: Pagination<HistoryTrack>
  limit: number
}

export function HistorySection({
  initialData,
  limit = 20,
  ...props
}: HistorySectionProps) {
  const { ref, inView } = useInView()

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useHistoryInfiniteQuery(limit, initialData)

  useEffect(() => {
    if (inView) fetchNextPage().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <DefaultSection title="History" {...props}>
      <div>
        {data.pages.map(({ items }) => (
          <ItemsList
            items={items.map(({ track, playedAt }) => ({
              ...track,
              playedAt,
            }))}
            key={items[0].id}
            withoutPosition
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          ref={ref}
          onClick={() => fetchNextPage()}
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
