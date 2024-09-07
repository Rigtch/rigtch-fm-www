import { AudioBars } from './audio-bars'
import { ToggleStateButton } from './toggle-state-button'

import { SpotifyLink } from '@app/components/common'
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card'
import { Skeleton } from '@app/components/ui/skeleton'

export function PlaybackCardSkeleton() {
  return (
    <Card className="!m-0 h-full w-full items-center border-neutral-800/50 bg-neutral-800/50 p-4 lg:w-[380px] xl:w-2/5 xl:min-w-[380px]">
      <CardHeader className="flex w-full flex-col gap-4 p-0 sm:flex-row">
        <Skeleton className="h-[128px] min-w-[128px]" />

        <div className="flex w-full flex-col justify-between gap-4 md:gap-0">
          <CardTitle className="flex w-full flex-col gap-3 whitespace-nowrap font-normal">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-3 w-16" />
          </CardTitle>

          <CardFooter className="flex w-full items-center justify-between">
            <div className="flex w-full flex-row justify-between">
              <div className="flex items-center gap-2">
                <AudioBars isPlaying={false} />

                <ToggleStateButton
                  isPlaying={false}
                  hasAccess
                  isDeviceAvailable={false}
                  toggleState={() => Promise.resolve()}
                />
              </div>

              <SpotifyLink isDisabled />
            </div>
          </CardFooter>
        </div>
      </CardHeader>
    </Card>
  )
}
