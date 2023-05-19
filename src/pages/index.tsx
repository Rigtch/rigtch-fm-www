import { Button } from 'antd'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

import { client } from '~/config'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/common/constants'
import { PROFILE_QUERY, Profile, ProfileQuery } from '~/graphql'

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

export default function Home({ displayName, href }: HomeProps) {
  const [, , removeCookies] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN])
  const router = useRouter()

  function logOut() {
    removeCookies(ACCESS_TOKEN)
    removeCookies(REFRESH_TOKEN)

    router.push('/about')
  }

  return (
    <main>
      <Button onClick={logOut} type="primary">
        log out
      </Button>
      <h1 className="text-info-100">{displayName}</h1>
      <p>{href}</p>
    </main>
  )
}
