import Link from 'next/link'
import { ComponentProps } from 'react'

import { TimeRange } from '@api/types'
import { Button } from '@components/ui/button'

export interface SeeMoreButtonProps extends ComponentProps<typeof Link> {
  timeRange?: TimeRange
}

export function SeeMoreButton({
  href,
  timeRange,
  ...props
}: SeeMoreButtonProps) {
  const hrefWithTimeRange = href + (timeRange ? `?time-range=${timeRange}` : '')

  return (
    <Button asChild variant="link">
      <Link href={hrefWithTimeRange} {...props}>
        See more
      </Link>
    </Button>
  )
}
