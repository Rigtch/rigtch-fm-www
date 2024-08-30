import { Suspense } from 'react'

import { ListeningDaysSection } from './sections'

import type { ProfilePageProps } from '@app/profile/types'
import { DefaultSection } from '@app/sections'
import { validateId } from '@app/utils/validators'
import { validateStatsMeasurement } from '@app/profile/utils/validators'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import { SelectStatsMeasurement } from '@app/profile/components/common/selects'

export default function ProfileReportsPage({
  params,
  searchParams,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const statsMeasurement = validateStatsMeasurement(
    searchParams[STATS_MEASUREMENT]
  )

  return (
    <DefaultSection
      title="Reports"
      headerAction={<SelectStatsMeasurement initialValue={statsMeasurement} />}
    >
      <Suspense>
        <ListeningDaysSection userId={userId} />
      </Suspense>
    </DefaultSection>
  )
}
