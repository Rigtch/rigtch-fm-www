import { GetServerSideProps } from 'next'
import { useEffect } from 'react'

import { client } from '~/config'
import { ACCESS_TOKEN } from '~/common/constants'
import { PROFILE_QUERY, Profile, ProfileQuery } from '~/graphql'
import { useAuth } from '~/hooks/auth'
import { Profilecard } from '~/components/profile'

export type HomeProps = Profile

export const getServerSideProps: GetServerSideProps = async ({
  req: { cookies },
}) => {
  try {
    const { data } = await client.query<ProfileQuery>({
      query: PROFILE_QUERY,
      context: {
        headers: {
          Authorization: `Bearer ${cookies[ACCESS_TOKEN]}`,
        },
      },
    })

    return {
      props: data.profile,
    }
  } catch {
    return {
      redirect: {
        destination: '/about',
        permanent: false,
      },
    }
  }
}

export default function Home(profile: HomeProps) {
  const { setProfile, getProfileImage } = useAuth()

  useEffect(() => {
    setProfile(profile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Profilecard {...profile} image={getProfileImage() ?? ''} />
    </div>
  )
}
