import { useEffect, useState } from 'react'
import Link from 'next/link'

import { TimeRange } from '@api/types'
import { useTopArtistsQuery } from '@api/hooks'
import { TopArtistsView } from '@components/views'

export function TopArtistsSection() {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LONG_TERM)
  const { data, refetch, isRefetching } = useTopArtistsQuery(timeRange)

  useEffect(() => {
    refetch()
  }, [timeRange, refetch])

  return (
    <TopArtistsView
      skeleton={isRefetching}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      items={data?.items ?? []}
    >
      <div className="align-self-center">
        <Link
          href="/profile/top-artists"
          className="no-underline text-lg text-white transition-color transition-duration-300 hover:text-primary"
        >
          See all
        </Link>
      </div>
    </TopArtistsView>
  )
}
