import { StatCard } from '../reports/components/cards'

import { Skeleton } from '@app/components/ui/skeleton'

export function TotalReportViewSkeleton() {
  return (
    <div className="flex gap-2">
      <StatCard label="Total playtime" className="w-full p-2 lg:w-auto">
        <Skeleton className="my-1 h-[24px] w-32" />
      </StatCard>

      <StatCard
        label="Total plays"
        className="w-full p-2 lg:w-auto"
        contentClassName="inline-flex"
      >
        <Skeleton className="my-1 h-[24px] w-16" />
        &nbsp;plays
      </StatCard>
    </div>
  )
}
