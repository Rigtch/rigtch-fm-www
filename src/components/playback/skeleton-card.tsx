import { Card, IconButton } from '@material-tailwind/react'
// import { Skeleton } from 'primereact/skeleton'

import { AudioBars, OpenInSpotifyButton } from '../common'

export function PlaybackSkeletonCard() {
  return (
    <Card
      style={{
        backgroundColor: '#263238',
      }}
      className="playback-card py-0"
    >
      <main className="flex gap-4">
        <div>{/* <Skeleton size="96px" /> */}</div>

        <div className="flex-column flex w-full gap-2">
          <div className="flex-column flex gap-1">
            {/* <Skeleton width="100%" height="24px" />
            <Skeleton width="40%" height="16px" /> */}
          </div>
          <div className="justify-content-between align-items-center flex">
            <div className="flex gap-2">
              <AudioBars isPlaying={false} />

              <IconButton
                color="green"
                variant="outlined"
                className="text-white"
                style={{
                  width: '28px',
                  height: '28px',
                  paddingLeft: '1.5px',
                }}
                // icon={'pi pi-play'}
                disabled={true}
                // tooltip={'No active device'}
              />
            </div>

            <div className="align-items-center flex gap-2">
              <OpenInSpotifyButton href={''} className="hidden md:block" />
            </div>
          </div>
        </div>
      </main>
    </Card>
  )
}
