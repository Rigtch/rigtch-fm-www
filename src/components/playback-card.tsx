import { Image } from 'primereact/image'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Skeleton } from 'primereact/skeleton'
import { useCookies } from 'react-cookie'

import { AudioBars, OpenInSpotifyButton } from './common'

import { PAUSE_PLAYER_QUERY, RESUME_PLAYER_QUERY } from '~/graphql/queries'
import { PausePlayerQuery, ResumePlayerQuery } from '~/graphql/types'
import { ACCESS_TOKEN } from '~/common/constants'
import { client } from '~/config'
import { usePlaybackState } from '~/hooks/playback-state'
import { applyAuthorizationHeader } from '~/common/auth'
import { isMobile } from '~/utils/is-mobile'

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
            ...applyAuthorizationHeader(cookies[ACCESS_TOKEN]),
          })
          .then(() => setIsPlaying(false))
      : client
          .query<ResumePlayerQuery>({
            query: RESUME_PLAYER_QUERY,
            ...applyAuthorizationHeader(cookies[ACCESS_TOKEN]),
          })
          .then(() => setIsPlaying(true)))
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
              src={getPlaybackAlbumImage()}
              alt={track?.album.name ?? ''}
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
                <p className="text-700 m-0">{getPlaybackArtists()}</p>
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
                onClick={handleChangePlayingStatus}
              />
            </div>

            <OpenInSpotifyButton
              href={track?.href ?? ''}
              className="hidden md:block"
            />
          </div>
        </div>
      </main>
    </Card>
  )
}
