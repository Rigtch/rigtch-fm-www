import { useEffect, useState } from 'react'
import Link from 'next/link'

import { TimeRange } from '@api/types'
import { useTopTracksQuery } from '@api/hooks'
import { TopTracksView } from '@components/views'

export function TopTracksSection() {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LONG_TERM)
  const { data, refetch } = useTopTracksQuery(timeRange)

  useEffect(() => {
    refetch()
  }, [timeRange, refetch])

  if (!data?.items) return null

  return (
    <TopTracksView
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      items={data.items}
    >
      <div className="align-self-center">
        <Link
          href="/profile/top-tracks"
          className="no-underline text-lg text-white transition-color transition-duration-300 hover:text-primary"
        >
          See all
        </Link>
      </div>
    </TopTracksView>
  )
}
