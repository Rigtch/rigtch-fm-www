import { Playback } from '../playback'

import { ProfileAvatarSkeleton } from './profile-avatar.skeleton'

import { SpotifyLink } from '@app/components/common'
import { Card, CardHeader } from '@app/components/ui/card'
import { Skeleton } from '@app/components/ui/skeleton'

export function ProfileCardSkeleton() {
  return (
    <Card className="min-w-[75%]">
      <CardHeader className="justify-between gap-8 p-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4 p-4">
          <ProfileAvatarSkeleton size="lg" />

          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-24" />

            <Skeleton className="h-4 w-28" />

            <div className="items-left flex flex-row gap-2">
              <SpotifyLink isDisabled href={''} />
            </div>
          </div>
        </div>

        <Playback />
      </CardHeader>
    </Card>
  )
}
