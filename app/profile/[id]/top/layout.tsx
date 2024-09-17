'use client'

import { StatsOptions } from '@app/profile/components/common'
import type { ProfileLayoutBaseProps } from '@app/profile/types'

export default function ProfileTopLayout({ children }: ProfileLayoutBaseProps) {
  return (
    <>
      <StatsOptions />

      {children}
    </>
  )
}
