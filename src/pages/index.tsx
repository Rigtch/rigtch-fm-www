import { GetServerSideProps } from 'next'
import { useEffect } from 'react'

import { client } from '~/config'
import { ACCESS_TOKEN } from '~/common/constants'
import { PROFILE_QUERY, TOP_GENRES_QUERY } from '~/graphql/queries'
import { Profile, ProfileQuery, TopGenresQuery } from '~/graphql/types'
import { useAuth } from '~/hooks/auth'
import { ProfileCard } from '~/components/profile'
import { LastTracksSection } from '~/components/last-tracks-section'
import { applyAuthorizationHeader } from '~/common/auth'
import { TopGenresSection } from '~/components/top-genres-section'

export type HomeProps = {
  profile: Profile

  topGenres: string[]
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

    return {
      props: {
        profile,

        topGenres,
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

export default function Home({ profile, topGenres }: HomeProps) {
  const { setProfile, getProfileImage } = useAuth()

  useEffect(() => {
    setProfile(profile)
    console.log('profile', profile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex-column flex gap-8">
      <ProfileCard {...profile} image={getProfileImage() ?? ''} />

      <TopGenresSection genres={topGenres} />

      <LastTracksSection />
    </div>
  )
}
