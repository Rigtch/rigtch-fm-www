'use client'

import type { ReactNode } from 'react'

import { StatsOptions } from '@app/profile/components/common'
import type { ProfileLayoutBaseProps } from '@app/profile/types'

namespace ProfileTopGenresSubLayout {
  export type Props = Readonly<
    ProfileLayoutBaseProps & {
      genres: ReactNode
      artists: ReactNode
      tracks: ReactNode
      albums: ReactNode
    }
  >
}

function ProfileTopGenresSubLayout({
  genres,
  artists,
  tracks,
  albums,
}: ProfileTopGenresSubLayout.Props) {
  return (
    <>
      <div className="px-4">
        <StatsOptions />
      </div>

      {genres}
      {artists}
      {albums}
      {tracks}
    </>
  )
}

export default ProfileTopGenresSubLayout
