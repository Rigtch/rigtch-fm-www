'use client'

import { useState, type HTMLAttributes } from 'react'

import { ProfileAvatar } from './profile-avatar'
import { ShareButton } from './share-button'

import { useToggleFollowing } from '@app/api/hooks'
import type { Profile, User } from '@app/api/types'
import { SpotifyLink } from '@app/components/common'
import { LinkButton } from '@app/components/common/buttons'
import { Button } from '@app/components/ui/button'
import { cn } from '@app/utils/cn'
import { findImage } from '@app/utils/find-image'

namespace ProfileCard {
  export type Props = Pick<Profile, 'displayName' | 'images' | 'href'> &
    Pick<User, 'followersCount' | 'followingCount' | 'id'> &
    Pick<HTMLAttributes<HTMLDivElement>, 'children'> & {
      currentUserId: string
      isFollowingUser: boolean
      isFollowingYou: boolean
      isAuthenticated: boolean
    }
}

function ProfileCard({
  displayName,
  images,
  followersCount,
  followingCount,
  id,
  currentUserId,
  isFollowingUser,
  isFollowingYou,
  isAuthenticated,
  href,
  children,
}: ProfileCard.Props) {
  const [isFollowingUserOptimistic, setIsFollowingUserOptimistic] =
    useState(isFollowingUser)
  const { toggle } = useToggleFollowing()

  async function handleToggleFollowing() {
    setIsFollowingUserOptimistic(isFollowing => !isFollowing)

    await toggle(isFollowingUserOptimistic)
  }

  return (
    <div className="min-w-[75%]">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center justify-start gap-4 px-2">
          <ProfileAvatar
            src={images.length > 0 ? findImage(images, 128) : undefined}
            displayName={displayName}
            size="lg"
          />

          <div className="flex h-full flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-2xl md:text-3xl">
                {displayName}
                <SpotifyLink href={href} />
              </div>

              <div className="flex items-center gap-2 whitespace-nowrap text-lg leading-5 text-foreground">
                <LinkButton
                  href={`/profile/${id}/followers`}
                  className="font-normal"
                >
                  {followersCount} Followers
                </LinkButton>
                &bull;
                <LinkButton
                  href={`/profile/${id}/following`}
                  className="font-normal"
                >
                  {followingCount} Following
                </LinkButton>
                {isFollowingYou && (
                  <>
                    &bull;
                    <p className="text-primary-foreground/80">(Follows you)</p>
                  </>
                )}
              </div>
            </div>

            <div className="items-left flex flex-row gap-2">
              {id !== currentUserId && (
                <Button
                  variant="outline"
                  className={cn(
                    'group hover:bg-white',
                    isFollowingUserOptimistic &&
                      "hover:before:content-['Unfollow']"
                  )}
                  disabled={
                    !isAuthenticated ||
                    isFollowingUser !== isFollowingUserOptimistic
                  }
                  onClick={handleToggleFollowing}
                >
                  <span
                    className={cn(
                      isFollowingUserOptimistic && 'group-hover:hidden'
                    )}
                  >
                    {isFollowingUserOptimistic ? 'Following' : 'Follow'}
                  </span>
                </Button>
              )}

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
