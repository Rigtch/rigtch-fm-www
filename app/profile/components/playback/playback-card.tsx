'use client'

import { useState } from 'react'

import { AudioBars } from './audio-bars'
import { ToggleStateButton } from './toggle-state-button'

import type { Device, Track } from '@app/api/types'
import { SpotifyLink } from '@app/components/common'
import { ItemImage, RelativeTime } from '@app/components/items/misc'
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card'
import { Skeleton } from '@app/components/ui/skeleton'
import { cn } from '@app/utils/cn'
import { formatArtists } from '@app/utils/formatters'

namespace PlaybackCard {
  export type Props = Readonly<{
    isPlaying?: boolean
    isPlayingOptimistic?: boolean
    track: Track
    device?: Device
    userId?: string
    routeUserId?: string
    handleToggleState: () => Promise<void>
  }>
}

function PlaybackCard({
  isPlaying = false,
  isPlayingOptimistic = false,
  track: { album, artists, ...track },
  device,
  userId,
  routeUserId,
  handleToggleState,
}: PlaybackCard.Props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <Card
      className={cn(
        '!m-0 h-full w-full p-4 lg:w-[380px] xl:w-2/5 xl:min-w-[380px]',
        isPlayingOptimistic ? 'border-success bg-success' : 'bg-neutral-800/50'
      )}
    >
      <CardHeader className="flex w-full flex-col gap-4 space-y-0 p-0 sm:flex-row">
        {isImageLoaded ? (
          <ItemImage
            images={album}
            size={128}
            alt={album.name}
            className={'w-full rounded-md sm:w-auto'}
          />
        ) : (
          <div>
            {/* Dummy Image */}
            <ItemImage
              size={0}
              onLoad={() => {
                setIsImageLoaded(true)
              }}
              images={album}
              alt={''}
            />
            <Skeleton className="h-[128px] w-[128px] max-w-[128px]" />
          </div>
        )}

        <div className="flex w-full flex-col justify-between gap-4 md:max-w-[calc(100%-140px)] md:gap-0">
          <CardTitle className="flex flex-col gap-1 whitespace-nowrap font-normal">
            <p className="inline-block overflow-hidden text-ellipsis whitespace-nowrap text-2xl">
              {track.name}
            </p>

            <p className="max-w-[380px] truncate text-neutral-300">
              {formatArtists(artists)}
            </p>
          </CardTitle>

          <CardFooter className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <AudioBars isPlaying={isPlaying} />

              <ToggleStateButton
                isPlaying={isPlayingOptimistic}
                isDeviceAvailable={!!device}
                hasAccess={routeUserId === userId}
                toggleState={handleToggleState}
              />
            </div>

            <div className="flex min-w-max flex-row gap-2">
              {!device && track.playedAt && (
                <RelativeTime value={track.playedAt} />
              )}

              <SpotifyLink href={track.href} />
            </div>
          </CardFooter>
        </div>
      </CardHeader>
    </Card>
  )
}

export { PlaybackCard }
