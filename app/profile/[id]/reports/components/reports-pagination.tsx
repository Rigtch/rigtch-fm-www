'use client'

import { DateTime } from 'luxon'
import type { HTMLAttributes } from 'react'
import { useSearchParams } from 'next/navigation'

import type { validateCursors } from '../helpers'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@app/components/ui/pagination'
import { cn } from '@app/utils/cn'
import { BETA_USER_CREATED_AT, STATS_MEASUREMENT } from '@app/profile/constants'
import { useUserQuery } from '@app/api/hooks'

namespace ReportsPagination {
  export type Props = ReturnType<typeof validateCursors> &
    Pick<HTMLAttributes<HTMLDivElement>, 'className'>
}

function ReportsPagination({
  after,
  before,
  className,
}: ReportsPagination.Props) {
  const { data: user } = useUserQuery()
  const searchParams = useSearchParams()
  const measurement = searchParams.get(STATS_MEASUREMENT)

  const userCreatedAt = user?.createdAt ?? BETA_USER_CREATED_AT

  const previousWeekBeforeParam = `${after.getFullYear()}-${after.getMonth() + 1}-${after.getDate()}`
  const previousWeekAfterDate = new Date(
    after.getTime() - 1000 * 60 * 60 * 24 * 7
  )
  const previousWeekAfterParam = `${previousWeekAfterDate.getFullYear()}-${previousWeekAfterDate.getMonth() + 1}-${previousWeekAfterDate.getDate()}`

  const isPreviousWeekDisabled =
    previousWeekAfterDate.getTime() <= userCreatedAt.getTime()

  const nextWeekAfterParam = `${before.getFullYear()}-${before.getMonth() + 1}-${before.getDate()}`
  const nextWeekBeforeDate = new Date(
    before.getTime() + 1000 * 60 * 60 * 24 * 7
  )
  const nextWeekBeforeParam = `${nextWeekBeforeDate.getFullYear()}-${nextWeekBeforeDate.getMonth() + 1}-${nextWeekBeforeDate.getDate()}`

  const isNextWeekDisabled = nextWeekBeforeDate.getTime() >= Date.now()

  const previousLinkSearchParams = new URLSearchParams({
    before: previousWeekBeforeParam,
    after: previousWeekAfterParam,
  })
  const nextLinkSearchParams = new URLSearchParams({
    before: nextWeekBeforeParam,
    after: nextWeekAfterParam,
  })

  if (measurement) {
    previousLinkSearchParams.set(STATS_MEASUREMENT, measurement)
    nextLinkSearchParams.set(STATS_MEASUREMENT, measurement)
  }

  return (
    <Pagination className={className}>
      <PaginationContent className="flex items-end justify-center gap-4">
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={isPreviousWeekDisabled}
            className={cn(
              isPreviousWeekDisabled &&
                'cursor-default text-muted-foreground hover:bg-background hover:text-muted-foreground'
            )}
            href={
              isPreviousWeekDisabled
                ? undefined
                : `?${previousLinkSearchParams.toString()}`
            }
          />
        </PaginationItem>

        <div className="flex flex-col items-center">
          <p className="text-3xl">{before.getFullYear()}</p>

          <p>
            {DateTime.fromJSDate(after).toFormat('LLL dd')}
            &nbsp;-&nbsp;
            {DateTime.fromMillis(before.getTime() - 1000).toFormat('LLL dd')}
          </p>
        </div>

        <PaginationItem>
          <PaginationNext
            aria-disabled={isNextWeekDisabled}
            className={cn(
              isNextWeekDisabled &&
                'cursor-default text-muted-foreground hover:bg-background hover:text-muted-foreground'
            )}
            href={
              isNextWeekDisabled
                ? undefined
                : `?${nextLinkSearchParams.toString()}`
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { ReportsPagination }
