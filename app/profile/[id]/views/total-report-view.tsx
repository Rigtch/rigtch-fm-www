import prettyMilliseconds from 'pretty-ms'

import { StatCard } from '../reports/components/cards'

import type { ProfileOverviewViewProps } from './types/props'

import {
  getReportsTotalPlays,
  getReportsTotalPlaytime,
} from '@app/api/fetchers/reports'
import { BETA_USER_CREATED_AT } from '@app/profile/constants'

namespace TotalReportView {
  export type Props = Readonly<
    Pick<ProfileOverviewViewProps, 'token' | 'userId'> & {
      createdAt: Date | undefined
    }
  >
}

async function TotalReportView({
  userId,
  token,
  createdAt,
}: TotalReportView.Props) {
  const [{ total: totalPlaytime }, { total: totalPlays }] = await Promise.all([
    getReportsTotalPlaytime(token, {
      userId,
      after: createdAt ?? BETA_USER_CREATED_AT,
    }),
    getReportsTotalPlays(token, {
      userId,
      after: createdAt ?? BETA_USER_CREATED_AT,
    }),
  ])

  return (
    <div className="flex gap-2">
      <StatCard label="Total playtime" className="w-full p-2 lg:w-auto">
        {prettyMilliseconds(totalPlaytime, {
          unitCount: 3,
        })}
      </StatCard>

      <StatCard label="Total plays" className="w-full p-2 lg:w-auto">
        {new Intl.NumberFormat('en-EN').format(totalPlays)} plays
      </StatCard>
    </div>
  )
}

export { TotalReportView }
