'use client'

import { StatsOptions } from '@app/profile/components/common'
import type { ProfileLayoutBaseProps } from '@app/profile/types'

export default function ProfileTopLayout({ children }: ProfileLayoutBaseProps) {
  return (
    <>
      <div className="px-4">
        <StatsOptions />
      </div>

      {children}
    </>
  )
}
