import { GetServerSideProps } from 'next'
import { useEffect } from 'react'

import { client } from '~/config'
import { ACCESS_TOKEN } from '~/common/constants'
import {
  CURRENT_PLAYBACK_STATE_QUERY,
  PROFILE_QUERY,
  LAST_TRACKS_QUERY,
  TOP_GENRES_QUERY,
  TOP_ARTISTS_QUERY,
} from '~/graphql/queries'
import {
  CurrentPlaybackStateQuery,
  LastTracksQuery,
  PlaybackState,
  Profile,
  ProfileQuery,
  TopGenresQuery,
  Track,
  TopArtistsQuery,
} from '~/graphql/types'
import { useAuth } from '~/hooks/auth'
import { ProfileCard } from '~/components/profile'
import { usePlaybackState } from '~/hooks/playback-state'
import { LastTracksSection } from '~/components/last-tracks-section'
import { applyAuthorizationHeader } from '~/common/auth'
import { TopGenresSection } from '~/components/top-genres-section'
import { Artist } from '~/graphql/types/artist'
import { TopArtistsSection } from '~/components/top-artists/section'

export type HomeProps = {
  profile: Profile
  topArtists: Artist[]
  lastTracks: Track[]
  topGenres: string[]
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

    const {
      data: {
        topGenres: { genres: topGenres },
      },
    } = await client.query<TopGenresQuery>({
      query: TOP_GENRES_QUERY,
      ...applyAuthorizationHeader(cookies[ACCESS_TOKEN]),
    })

    const {
      data: { topArtists },
    } = await client.query<TopArtistsQuery>({
      query: TOP_ARTISTS_QUERY,
      context: {
        headers: {
          Authorization: `Bearer ${cookies[ACCESS_TOKEN]}`,
        },
      },
    })

    return {
      props: {
        profile,
        lastTracks,
        topGenres,
        playbackState: data?.currentPlaybackState ?? {
          isPlaying: false,
          track: lastTracks[0],
        },
        topArtists,
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
  topGenres,
  topArtists,
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

      <TopGenresSection genres={topGenres} />

      <TopArtistsSection topArtists={topArtists} />

      <LastTracksSection tracks={lastTracks} />
    </div>
  )
}
