import { Chip } from 'primereact/chip'
import { useEffect, useState } from 'react'
import { Skeleton } from 'primereact/skeleton'

import { useTopGenresQuery } from '@api/hooks'
import { TimeRange } from '@api/types'
import { SelectTimeRange } from '@components/common'

export function TopGenresSection() {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LONG_TERM)
  const { data, refetch, isRefetching } = useTopGenresQuery(timeRange)

  useEffect(() => {
    refetch()
  }, [timeRange, refetch])

  if (!data) return null

  return (
    <section className="flex flex-column gap-4 md:gap-2">
      <header className="flex flex-column md:flex-row gap-2 align-items-center justify-content-between">
        <h2 className="text-4xl">Top genres</h2>

        <SelectTimeRange value={timeRange} onChange={setTimeRange} />
      </header>

      <main className="flex flex-wrap gap-1">
        {isRefetching ? (
          <div className="flex flex-row gap-2">
            {Array.from({ length: 10 }).map((item, index) => (
              <Skeleton
                width="6rem"
                height="2rem"
                borderRadius="16px"
                key={index}
              />
            ))}
          </div>
        ) : (
          data.genres.map(genre => <Chip key={genre} label={genre} />)
        )}
      </main>
    </section>
  )
}
