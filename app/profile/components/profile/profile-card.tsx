import type { HTMLAttributes } from 'react'

import { ProfileAvatar } from './profile-avatar'
import { ShareButton } from './share-button'

import type { Profile } from '@app/api/types'
import { FollowersCount, SpotifyLink } from '@app/components/common'
import { CardDescription, CardTitle } from '@app/components/ui/card'
import { findImage } from '@app/utils/find-image'

namespace ProfileCard {
  export type Props = Pick<
    Profile,
    'displayName' | 'images' | 'followers' | 'href'
  > &
    Pick<HTMLAttributes<HTMLDivElement>, 'children'>
}

function ProfileCard({
  displayName,
  images,
  followers,
  href,
  children,
}: ProfileCard.Props) {
  return (
    <div className="min-w-[75%]">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center justify-start gap-4 px-2">
          <ProfileAvatar
            src={images.length > 0 ? findImage(images, 128) : undefined}
            displayName={displayName}
            size="lg"
          />

          <div className="flex h-full flex-col justify-between gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl">
                {displayName}
              </CardTitle>

              <CardDescription className="flex items-center gap-2 whitespace-nowrap text-lg leading-5 text-foreground">
                <SpotifyLink href={href} />

                <FollowersCount value={followers} />
              </CardDescription>
            </div>

            <div className="items-left flex flex-row gap-2">
              <ShareButton />
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}

export { ProfileCard }
