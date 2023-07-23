import { Image } from 'primereact/image'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Skeleton } from 'primereact/skeleton'

import { AudioBars, OpenInSpotifyButton } from '../common'
import { RelativeTime } from '../utils'

import { PlaybackSkeletonCard } from './skeleton-card'

import {
  useLastTracks,
  usePlaybackState,
  useTogglePlaybackState,
} from '~/hooks/api'
import { isMobile } from '~/utils/is-mobile'
import { getArtists } from '~/utils/get-artists'

export function PlaybackCard() {
  const { data, refetch } = usePlaybackState()
  const { data: lastTracksData } = useLastTracks()
  const { toggle } = useTogglePlaybackState()

  if (!data && !lastTracksData) return <PlaybackSkeletonCard />

  const isPlaying = data?.isPlaying ?? false
  const device = data?.device
  const album = data?.track?.album ?? lastTracksData?.[0]?.album
  const track = data?.track ?? lastTracksData?.[0]

  if (!album || !track) return <PlaybackSkeletonCard />

  const {
    images: [{ url: albumImage }],
  } = album

  function handleChangePlaybackState() {
    toggle(isPlaying).then(() => refetch())
  }

  return (
    <Card
      style={{
        backgroundColor: isPlaying ? '#388e3c' : '#263238',
      }}
      className="playback-card py-0"
      onClick={() => isMobile() && window.open(track?.href, '_blank')}
    >
      <main className="flex gap-4">
        <div>
          {track ? (
            <Image
              src={albumImage}
              alt={album.name}
              width="96"
              height="96"
              imageClassName="border-round-md"
            />
          ) : (
            <Skeleton size="96px" />
          )}
        </div>

        <div className="flex-column flex w-full gap-2">
          <div className="flex-column flex gap-1">
            {track ? (
              <>
                <p className="m-0 text-2xl text-white">{track?.name}</p>
                <p className="text-700 m-0">{getArtists(track.artists)}</p>
              </>
            ) : (
              <>
                <Skeleton width="100%" height="24px" />
                <Skeleton width="40%" height="16px" />
              </>
            )}
          </div>

          <div className="justify-content-between align-items-center flex">
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
                onClick={handleChangePlaybackState}
              />
            </div>

            <div className="align-items-center flex gap-2">
              {track?.playedAt && <RelativeTime value={track.playedAt} />}

              <OpenInSpotifyButton
                href={track?.href ?? ''}
                className="hidden md:block"
              />
            </div>
          </div>
        </div>
      </main>
    </Card>
  )
}
