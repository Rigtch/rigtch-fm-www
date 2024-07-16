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
  export interface Props {
    isPlaying?: boolean
    isPlayingOptimistic?: boolean
    track: Track
    device?: Device
    userId?: string
    routeUserId?: string
    handleToggleState: () => Promise<void>
  }
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
        'p-4 w-full h-full !m-0 lg:w-[380px] xl:min-w-[380px] xl:w-2/5',
        isPlayingOptimistic ? 'bg-success border-success' : 'bg-neutral-800/50 '
      )}
    >
      <CardHeader className="flex flex-col sm:flex-row gap-4 p-0 w-full space-y-0">
        {isImageLoaded ? (
          <ItemImage
            images={album}
            size={128}
            alt={album.name}
            className={'rounded-md w-full sm:w-auto'}
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
            <Skeleton className="h-[128px] w-[128px]" />
          </div>
        )}

        <div className="flex flex-col justify-between w-full md:max-w-[calc(100%-140px)] gap-4 md:gap-0">
          <CardTitle className="whitespace-nowrap font-normal flex flex-col gap-1">
            <p className="text-2xl inline-block text-ellipsis overflow-hidden whitespace-nowrap">
              {track.name}
            </p>

            <p className="text-neutral-300 truncate max-w-[380px]">
              {formatArtists(artists)}
            </p>
          </CardTitle>

          <CardFooter className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center">
              <AudioBars isPlaying={isPlaying} />

              <ToggleStateButton
                isPlaying={isPlayingOptimistic}
                isDeviceAvailable={!!device}
                hasAccess={routeUserId === userId}
                toggleState={handleToggleState}
              />
            </div>

            <div className="flex flex-row gap-2 min-w-max">
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
