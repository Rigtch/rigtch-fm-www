import { GetServerSideProps } from 'next'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

import { DefaultPageProps } from './_app'

import { client } from '~/config'
import { ACCESS_TOKEN, IS_AUTHORIZED } from '~/common/constants'
import { PROFILE_QUERY, TOP_GENRES_QUERY } from '~/graphql/queries'
import { ProfileQuery, TopGenresQuery } from '~/graphql/types'
import { ProfileCard } from '~/components/profile'
import { LastTracksSection } from '~/components/last-tracks-section'
import { applyAuthorizationHeader } from '~/common/auth'
import { TopGenresSection } from '~/components/top-genres-section'
import { getImage } from '~/utils/get-image'

export interface HomeProps extends Required<DefaultPageProps> {
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
  const [, setCookies] = useCookies([IS_AUTHORIZED])

  useEffect(() => {
    setCookies(IS_AUTHORIZED, !!profile)
  }, [profile, setCookies])

  return (
    <div className="flex-column flex gap-8">
      <ProfileCard {...profile} image={getImage(profile.images)} />

      <TopGenresSection genres={topGenres} />

      <LastTracksSection />
    </div>
  )
}
