'use client'

import type { ReactNode } from 'react'

import { StatsOptions } from '@app/profile/components/common'
import type { ProfileLayoutBaseProps } from '@app/profile/types'

namespace ProfileTopGenresSubLayout {
  export type Props = Readonly<
    ProfileLayoutBaseProps & {
      artists: ReactNode
      tracks: ReactNode
      albums: ReactNode
    }
  >
}

function ProfileTopGenresSubLayout({
  artists,
  tracks,
  albums,
}: ProfileTopGenresSubLayout.Props) {
  return (
    <>
      <div className="xl:my-4">
        <StatsOptions />
      </div>

      {artists}
      {albums}
      {tracks}
    </>
  )
}

export default ProfileTopGenresSubLayout
