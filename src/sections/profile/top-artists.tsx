import { useEffect, useState } from 'react'
import Link from 'next/link'

import { TimeRange } from '@api/types'
import { useTopArtistsQuery } from '@api/hooks'
import { TopArtistsView } from '@components/views'

export function TopArtistsSection() {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LONG_TERM)
  const { data, refetch } = useTopArtistsQuery(timeRange)

  useEffect(() => {
    refetch()
  }, [timeRange, refetch])

  if (!data?.items) return null

  return (
    <TopArtistsView
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      items={data.items}
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
