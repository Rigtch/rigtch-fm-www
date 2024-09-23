'use client'

import type { ReactNode } from 'react'

import type { ProfileLayoutBaseProps } from '@app/profile/types'

namespace ProfileTopGenresSubLayout {
  export type Props = Readonly<
    ProfileLayoutBaseProps & {
      tracks: ReactNode
    }
  >
}

function ProfileTopGenresSubLayout({
  tracks,
}: ProfileTopGenresSubLayout.Props) {
  return tracks
}

export default ProfileTopGenresSubLayout
