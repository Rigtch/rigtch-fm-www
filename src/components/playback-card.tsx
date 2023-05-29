import { Image } from 'primereact/image'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { useCookies } from 'react-cookie'

import {
  PAUSE_PLAYER_QUERY,
  PausePlayerQuery,
  RESUME_PLAYER_QUERY,
  ResumePlayerQuery,
} from '~/graphql'
import { ACCESS_TOKEN } from '~/common/constants'
import { client } from '~/config'
import { usePlaybackState } from '~/hooks/playback-state'

export function PlaybackCard() {
  const [cookies] = useCookies([ACCESS_TOKEN])
  const {
    isPlaying,
    track,
    getPlaybackAlbumImage,
    getPlaybackArtists,
    setIsPlaying,
  } = usePlaybackState()

  async function handleChangeIsPlayingStatus() {
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
        <Image
          src={getPlaybackAlbumImage()}
          alt={track?.album.name ?? ''}
          width="96"
          height="96"
          imageClassName="border-round-md"
        />

        <div className="flex flex-column justify-content-between py-1">
          <div className="flex flex-column gap-1">
            <p className="text-2xl m-0 text-white">{track?.name}</p>
            <p className="m-0 text-700">{getPlaybackArtists()}</p>
          </div>

          <Button
            severity="success"
            text
            rounded
            className="text-white"
            style={{
              width: '28px',
              height: '28px',
              paddingLeft: isPlaying ? '1px' : '2px',
            }}
            icon={`pi ${isPlaying ? 'pi-pause' : 'pi-play'}`}
            onClick={handleChangeIsPlayingStatus}
          />
        </div>

        <div className="flex align-items-end">
          <Button
            severity="success"
            text
            className="text-white"
            onClick={() => window.open(track?.href, '_blank')}
          >
            Open in Spotify
          </Button>
        </div>
      </main>
    </Card>
  )
}
