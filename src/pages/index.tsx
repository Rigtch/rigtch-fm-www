import { GetServerSideProps } from 'next'
import { useEffect } from 'react'

import { client } from '~/config'
import { ACCESS_TOKEN } from '~/common/constants'
import {
  CURRENT_PLAYBACK_STATE_QUERY,
  PROFILE_QUERY,
  LAST_TRACKS_QUERY,
} from '~/graphql/queries'
import {
  CurrentPlaybackStateQuery,
  LastTracksQuery,
  PlaybackState,
  Profile,
  ProfileQuery,
  Track,
} from '~/graphql/types'
import { useAuth } from '~/hooks/auth'
import { ProfileCard } from '~/components/profile'
import { usePlaybackState } from '~/hooks/playback-state'
import { LastTracksSection } from '~/components/last-tracks-section'
import { applyAuthorizationHeader } from '~/common/auth'

export type HomeProps = {
  profile: Profile
  playbackState: PlaybackState
  lastTracks: Track[]
}

export const getServerSideProps: GetServerSideProps = async ({
  req: { cookies },
}) => {
  try {
    const {
      data: { profile },
    } = await client.query<ProfileQuery>({
      query: PROFILE_QUERY,
      ...applyAuthorizationHeader(cookies[ACCESS_TOKEN]),
    })

    const { data } = await client.query<CurrentPlaybackStateQuery>({
      query: CURRENT_PLAYBACK_STATE_QUERY,
      ...applyAuthorizationHeader(cookies[ACCESS_TOKEN]),
    })

    const {
      data: { lastTracks },
    } = await client.query<LastTracksQuery>({
      query: LAST_TRACKS_QUERY,
      ...applyAuthorizationHeader(cookies[ACCESS_TOKEN]),
    })

    return {
      props: {
        profile,
        lastTracks,
        playbackState: data?.currentPlaybackState ?? {
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

export default function Home({
  profile,
  playbackState,
  lastTracks,
}: HomeProps) {
  const { setProfile, getProfileImage } = useAuth()
  const { setPlaybackState } = usePlaybackState()

  useEffect(() => {
    setProfile(profile)
    setPlaybackState(playbackState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex-column flex gap-8">
      <ProfileCard {...profile} image={getProfileImage() ?? ''} />

      <LastTracksSection tracks={lastTracks} />
    </div>
  )
}
