import { GetServerSideProps } from 'next'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

import { DefaultPageProps } from './_app'

import { client } from '~/config'
import { ACCESS_TOKEN, IS_AUTHORIZED } from '~/common/constants'
import { PROFILE_QUERY, TOP_GENRES_QUERY } from '~/graphql/queries'
import {
  Artist,
  ProfileQuery,
  TopArtistsQuery,
  TopGenresQuery,
  TopTracksQuery,
  Track,
} from '~/graphql/types'
import { ProfileCard } from '~/components/profile'
import { LastTracksSection } from '~/components/last-tracks-section'
import { applyAuthorizationHeader } from '~/common/auth'
import { TopGenresSection } from '~/components/top-genres-section'
import { getImage } from '~/utils/get-image'
import { TOP_ARTISTS_QUERY } from '~/graphql/queries/top-artists'
import { TopArtistsSection } from '~/components/top-artists/section'
import { TopTracksSection } from '~/components/top-tracks/section'
import { TOP_TRACKS_QUERY } from '~/graphql/queries/top-tracks'

export interface HomeProps extends Required<DefaultPageProps> {
  topGenres: string[]
  topArtists: Artist[]
  topTracks: Track[]
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
      ...applyAuthorizationHeader(cookies[ACCESS_TOKEN]),
    })

    const {
      data: { topTracks },
    } = await client.query<TopTracksQuery>({
      query: TOP_TRACKS_QUERY,
      ...applyAuthorizationHeader(cookies[ACCESS_TOKEN]),
    })

    return {
      props: {
        profile,
        topGenres,
        topArtists,
        topTracks,
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
  topGenres,
  topArtists,
  topTracks,
}: HomeProps) {
  const [, setCookies] = useCookies([IS_AUTHORIZED])

  useEffect(() => {
    setCookies(IS_AUTHORIZED, !!profile)
  }, [profile, setCookies])

  return (
    <div className="flex-column flex gap-8">
      <ProfileCard {...profile} image={getImage(profile.images)} />

      <TopGenresSection genres={topGenres} />

      <TopArtistsSection topArtists={topArtists} />

      <TopTracksSection topTracks={topTracks} />

      <LastTracksSection />
    </div>
  )
}
