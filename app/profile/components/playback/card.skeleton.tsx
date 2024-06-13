import { PlaybackToggleStateButton } from './toggle-state-button'
import { AudioBars } from './audio-bars'

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card'
import { Skeleton } from '@app/components/ui/skeleton'

export function PlaybackCardSkeleton() {
  return (
    <Card className="bg-neutral-800/50 border-neutral-800/50 p-4 w-full h-full items-center !m-0 lg:w-[380px] xl:min-w-[380px] xl:w-2/5">
      <CardHeader className="flex flex-col sm:flex-row gap-4 p-0 w-full">
        <Skeleton className="h-[128px] w-[128px]" />

        <div className="flex flex-col justify-between gap-4 md:gap-0">
          <CardTitle className="whitespace-nowrap w-full font-normal flex flex-col gap-3">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-3 w-16" />
          </CardTitle>

          <CardFooter className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <AudioBars isPlaying={false} />

              <PlaybackToggleStateButton
                isPlaying={false}
                hasAccess
                isDeviceAvailable={false}
                toggleState={() => Promise.resolve()}
              />
            </div>
          </CardFooter>
        </div>
      </CardHeader>
    </Card>
  )
}
