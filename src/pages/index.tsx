import { Card } from 'primereact/card'
import { GetServerSideProps } from 'next'
import { QueryClient, dehydrate } from '@tanstack/react-query'

import Steps from '@components/connect/steps'
import { ConnectCard } from '@components/connect'
import { DiscordCard } from '@components/connect/discord-card'
import { ACCESS_TOKEN, PROFILE } from '@api/constants'
import { getProfile } from '@api/fetchers'

export const getServerSideProps: GetServerSideProps = async ({
  req: { cookies },
}) => {
  const accessToken = cookies[ACCESS_TOKEN]
  const queryClient = new QueryClient()

  await queryClient
    .fetchQuery([PROFILE], () => getProfile(accessToken))
    .catch(() => {})

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Home() {
  return (
    <main className="align-items-center flex flex-column w-full gap-8">
      <span className="text-6xl font-bold">Welcome to Rigtch!</span>

      <section className="flex flex-column md:flex-row align-items-center justify-content-between gap-8 w-full">
        <Card className="w-full h-full">
          <div className="flex flex-column align-items-center gap-6 p-2">
            <div className="flex flex-column align-items-center">
              <span className="text-4xl font-bold">What&apos;s Rigtch?</span>
              <p className="text-lg max-w-30rem text-center">
                Rigtch is website focused on displaying your all-time statistics
                such as favorite artists, most listened songs etc.
              </p>
            </div>

            <div className="flex flex-column align-items-center gap-4">
              <span className="text-4xl font-bold">It&apos;s simple</span>
              <Steps />
            </div>
          </div>
        </Card>

        <div className="flex flex-column gap-3 w-full">
          <ConnectCard />

          <DiscordCard />
        </div>
      </section>
    </main>
  )
}
