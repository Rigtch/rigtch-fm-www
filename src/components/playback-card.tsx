import { Image } from 'primereact/image'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { useCookies } from 'react-cookie'

import { AudioBars } from './utils'

import { PAUSE_PLAYER_QUERY, RESUME_PLAYER_QUERY } from '~/graphql/queries'
import { PausePlayerQuery, ResumePlayerQuery } from '~/graphql/types'
import { ACCESS_TOKEN } from '~/common/constants'
import { client } from '~/config'
import { usePlaybackState } from '~/hooks/playback-state'

export function PlaybackCard() {
  const [cookies] = useCookies([ACCESS_TOKEN])
  const {
    isPlaying,
    track,
    device,
    getPlaybackAlbumImage,
    getPlaybackArtists,
    setIsPlaying,
  } = usePlaybackState()

  async function handleChangePlayingStatus() {
    await (isPlaying
      ? client
          .query<PausePlayerQuery>({
            query: PAUSE_PLAYER_QUERY,
            context: {
              headers: {
                Authorization: `Bearer ${cookies[ACCESS_TOKEN]}`,
              },
            },
          })
          .then(() => setIsPlaying(false))
      : client
          .query<ResumePlayerQuery>({
            query: RESUME_PLAYER_QUERY,
            context: {
              headers: {
                Authorization: `Bearer ${cookies[ACCESS_TOKEN]}`,
              },
            },
          })
          .then(() => setIsPlaying(true)))
  }

  return (
    <Card
      style={{ backgroundColor: isPlaying ? '#388e3c' : '#263238' }}
      className="py-0"
    >
      <main className="flex gap-4">
        <div>
          <Image
            src={getPlaybackAlbumImage()}
            alt={track?.album.name ?? ''}
            width="96"
            height="96"
            imageClassName="border-round-md"
          />

          <Button
            severity="success"
            text
            className="align-self-end block text-white md:hidden"
            onClick={() => window.open(track?.href, '_blank')}
          >
            Open in Spotify
          </Button>
        </div>

        <div className="flex-column flex w-full gap-2">
          <div className="flex-column flex gap-1">
            <p className="m-0 text-2xl text-white">{track?.name}</p>
            <p className="text-700 m-0">{getPlaybackArtists()}</p>
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
                onClick={handleChangePlayingStatus}
              />
            </div>

            <Button
              severity="success"
              text
              className="align-self-end hidden text-white md:block"
              onClick={() => window.open(track?.href, '_blank')}
            >
              Open in Spotify
            </Button>
          </div>
        </div>
      </main>
    </Card>
  )
}
