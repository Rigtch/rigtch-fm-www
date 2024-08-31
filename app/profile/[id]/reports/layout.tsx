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
  }
}

function ProfileReportsLayout({ listeningDays }: ProfileReportsLayout.Props) {
  const searchParams = useSearchParams()

  const statsMeasurement = validateStatsMeasurement(
    searchParams.get(STATS_MEASUREMENT)
  )

  return (
    <DefaultSection
      title="Reports"
      headerAction={<SelectStatsMeasurement initialValue={statsMeasurement} />}
    >
      {listeningDays}
    </DefaultSection>
  )
}

export default ProfileReportsLayout
