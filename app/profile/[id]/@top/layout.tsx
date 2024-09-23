'use client'

import type { ReactNode } from 'react'

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
      {artists}
      {albums}
      {tracks}
    </>
  )
}

export default ProfileTopGenresSubLayout
