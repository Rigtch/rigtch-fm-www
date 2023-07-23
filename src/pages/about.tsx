import { GetServerSideProps } from 'next'
import { QueryClient } from '@tanstack/react-query'

import { PageProps } from './_app'

import { getProfile } from '~/api/fetchers'
import { ACCESS_TOKEN, PROFILE } from '~/api/constants'
import { ConnectCard } from '~/components/connect'

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req: { cookies },
}) => {
  try {
    const queryClient = new QueryClient()
    await queryClient.fetchQuery([PROFILE], () =>
      getProfile(cookies[ACCESS_TOKEN])
    )

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } catch {
    return {
      props: {},
    }
  }
}

export default function About() {
  return (
    <main className="justify-content-center flex">
      <ConnectCard />
    </main>
  )
}
