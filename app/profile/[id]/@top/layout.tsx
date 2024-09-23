'use client'

import type { ReactNode } from 'react'

import type { ProfileLayoutBaseProps } from '@app/profile/types'

namespace ProfileTopGenresSubLayout {
  export type Props = Readonly<
    ProfileLayoutBaseProps & {
      tracks: ReactNode
      albums: ReactNode
    }
  >
}

function ProfileTopGenresSubLayout({
  tracks,
  albums,
}: ProfileTopGenresSubLayout.Props) {
  return (
    <>
      {albums}
      {tracks}
    </>
  )
}

export default ProfileTopGenresSubLayout
