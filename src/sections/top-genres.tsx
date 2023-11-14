'use client'

import { useEffect, useState } from 'react'

import { useTopGenresQuery } from '@api/hooks'
import { TimeRange } from '@api/types'
import { GenreChip } from '@components/common/genre-chip'
import { SelectTimeRange } from '@components/common/select-time-range'

export function TopGenresSection() {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LONG_TERM)
  const { data, refetch } = useTopGenresQuery(timeRange)

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <section className="flex flex-col gap-3">
      <header className="flex flex-row justify-between">
        <h2 className="text-5xl">Top genres</h2>

        <SelectTimeRange value={timeRange} onChange={setTimeRange} />
      </header>

      <main>
        <div className="flex flex-row flex-wrap gap-2">
          {data?.genres.map(genre => (
            <div key={genre}>
              <GenreChip genre={genre} />
            </div>
          ))}
        </div>
      </main>
    </section>
  )
}
