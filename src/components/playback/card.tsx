import { Image } from 'primereact/image'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

import { AudioBars, OpenInSpotifyButton } from '../common'
import { RelativeTime } from '../utils'

import { PlaybackSkeletonCard } from './skeleton-card'

import { isMobile } from '@utils/is-mobile'
import { getArtists } from '@utils/get-artists'
import { usePlaybackStateContext } from '@context/playback-state'

export function PlaybackCard() {
  const { data, isPlaying, toggleState } = usePlaybackStateContext()

  if (!data) return <PlaybackSkeletonCard />

  const { device, track, album, albumImage } = data

  return (
    <Card
      style={{
        backgroundColor: isPlaying ? '#388e3c' : '#263238',
      }}
      className="playback-card py-0"
      onClick={() => isMobile() && window.open(track.href, '_blank')}
    >
      <main className="flex gap-4">
        <div>
          <Image
            src={albumImage}
            alt={album.name}
            width="96"
            height="96"
            imageClassName="border-round-md"
          />
        </div>

        <div className="flex-column flex w-full gap-2">
          <div className="flex-column flex gap-1">
            <p className="m-0 text-2xl text-white">{track.name}</p>
            <p className="text-700 m-0">{getArtists(track.artists)}</p>
          </div>

          <div className="justify-content-between align-items-center flex gap-4">
            <div className="flex gap-2">
              <AudioBars isPlaying={isPlaying} />

              <Button
                severity="success"
                rounded
                outlined
                className="text-white"
                style={{
                  width: '28px',
                  height: '28px',
                  paddingLeft: isPlaying ? '.5px' : '1.5px',
                }}
                icon={`pi ${isPlaying ? 'pi-pause' : 'pi-play'}`}
                disabled={!device}
                tooltip={device ? undefined : 'No active device'}
                onClick={() => toggleState()}
              />
            </div>

            <div className="align-items-center flex gap-2">
              {track.playedAt && <RelativeTime value={track.playedAt} />}

              <OpenInSpotifyButton
                href={track.href}
                className="hidden md:block"
              />
            </div>
          </div>
        </div>
      </main>
    </Card>
  )
}
