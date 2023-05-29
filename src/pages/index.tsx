import { GetServerSideProps } from 'next'
import { useEffect } from 'react'

import { client } from '~/config'
import { ACCESS_TOKEN } from '~/common/constants'
import {
  CURRENT_PLAYBACK_STATE_QUERY,
  CurrentPlaybackStateQuery,
  LAST_TRACKS_QUERY,
  LastTracksQuery,
  PROFILE_QUERY,
  PlaybackState,
  Profile,
  ProfileQuery,
} from '~/graphql'
import { useAuth } from '~/hooks/auth'
import { ProfileCard } from '~/components/profile'
import { usePlaybackState } from '~/hooks/playback-state'

export type HomeProps = {
  profile: Profile
  playbackState: PlaybackState
}

export const getServerSideProps: GetServerSideProps = async ({
  req: { cookies },
}) => {
  try {
    const {
      data: { profile },
    } = await client.query<ProfileQuery>({
      query: PROFILE_QUERY,
      context: {
        headers: {
          Authorization: `Bearer ${cookies[ACCESS_TOKEN]}`,
        },
      },
    })

    const {
      data: { currentPlaybackState: playbackState },
    } = await client
      .query<CurrentPlaybackStateQuery>({
        query: CURRENT_PLAYBACK_STATE_QUERY,
        context: {
          headers: {
            Authorization: `Bearer ${cookies[ACCESS_TOKEN]}`,
          },
        },
      })
      .catch(() => ({ data: { currentPlaybackState: undefined } }))

    const {
      data: { lastTracks },
    } = await client.query<LastTracksQuery>({
      query: LAST_TRACKS_QUERY,
      context: {
        headers: {
          Authorization: `Bearer ${cookies[ACCESS_TOKEN]}`,
        },
      },
    })

    return {
      props: {
        profile,
        playbackState: playbackState ?? {
          isPlaying: false,
          track: lastTracks[0],
        },
      },
    }
  } catch (error) {
    console.log('error', error)

    return {
      redirect: {
        destination: '/about',
        permanent: false,
      },
    }
  }
}

export default function Home({ profile, playbackState }: HomeProps) {
  const { setProfile, getProfileImage } = useAuth()
  const { setPlaybackState } = usePlaybackState()

  useEffect(() => {
    setProfile(profile)
    setPlaybackState(playbackState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <ProfileCard {...profile} image={getProfileImage() ?? ''} />
    </div>
  )
}
