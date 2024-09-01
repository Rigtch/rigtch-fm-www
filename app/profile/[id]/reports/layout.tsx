'use client'

import type { ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'

import type { ProfileLayoutBaseProps } from '@app/profile/types'
import { DefaultSection } from '@app/sections'
import { SelectStatsMeasurement } from '@app/profile/components/common/selects'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import { validateStatsMeasurement } from '@app/profile/utils/validators'

namespace ProfileReportsLayout {
  export interface Props extends ProfileLayoutBaseProps {
    listeningDays: ReactNode
    listeningHours: ReactNode
    mostListenedItems: ReactNode
  }
}

function ProfileReportsLayout({
  listeningDays,
  listeningHours,
  mostListenedItems,
}: ProfileReportsLayout.Props) {
  const searchParams = useSearchParams()

  const statsMeasurement = validateStatsMeasurement(
    searchParams.get(STATS_MEASUREMENT)
  )

  return (
    <DefaultSection
      title="Reports"
      headerAction={<SelectStatsMeasurement initialValue={statsMeasurement} />}
      className="gap-16"
    >
      {listeningDays}
      {listeningHours}
      {mostListenedItems}
    </DefaultSection>
  )
}

export default ProfileReportsLayout
