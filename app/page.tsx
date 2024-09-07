import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getServerUser } from './auth/utils'
import { ConnectButton } from './components/auth'
import { USER_ID } from './constants'

export default async function HomePage() {
  const currentUser = await getServerUser()
  const userId = cookies().get(USER_ID)?.value

  if (currentUser && userId) redirect(`/profile/${userId}`)

  return (
    <div className="max-w-screen overflow-x-hidden bg-[linear-gradient(to_bottom_right,#0a0a0a,#171717)]">
      <section className="flex w-screen flex-col gap-12 p-4 lg:gap-16">
        <header className="flex flex-col gap-8">
          <div className="flex h-min items-center justify-center gap-4 rounded-lg p-2">
            <Image
              src="/rigtch-icon.png"
              alt={'spotify'}
              width={64}
              height={64}
              className="h-max rounded-xl"
            />

            <h1 className="text-center text-5xl">
              <span className="font-semibold">rigtch.fm</span>
            </h1>
          </div>

          <h2 className="text-center text-xl font-semibold">
            Real time spotify statistics calculation based on your listening
            history.
          </h2>
        </header>

        <main className="flex flex-col gap-12 p-4">
          <div className="left-0 flex flex-col items-center justify-center gap-12 lg:flex-row lg:justify-around">
            <div className="flex max-w-[500px] flex-col items-center gap-4 text-xl uppercase lg:text-2xl">
              <div className="ml-4 mr-4 flex items-center rounded-full bg-accent/90 p-6 text-white lg:ml-12 lg:mr-6">
                <p>Top listened artists, albums, tracks and genres</p>
              </div>
              <div className="-ml-4 mr-12 flex items-center rounded-full bg-[#0d0026] p-6 text-white lg:-ml-12">
                <p>Selecting time range 7-90 days</p>
              </div>
              <div className="ml-8 flex items-center rounded-full bg-[#276cdb] p-6 text-white lg:ml-16 lg:mr-12">
                <p>Share your statistics with your friends</p>
              </div>
            </div>

            <Image
              src="/statistics-example.png"
              alt="statistics example"
              className="rounded-lg shadow-2xl"
              width={450}
              height={1000}
            />
          </div>

          <div className="left-0 flex flex-col-reverse items-center justify-center gap-12 lg:flex-row lg:justify-around">
            <Image
              src="/statistics-measurement-playtime-example.png"
              alt="statistics example"
              className="rounded-lg shadow-2xl"
              width={450}
              height={1000}
            />

            <div className="flex max-w-[500px] flex-col items-center gap-4 text-xl uppercase lg:text-2xl">
              <div className="mr-4 flex items-center rounded-full bg-accent/90 p-6 text-white lg:mr-24">
                <p>Selecting measurements either plays or play time</p>
              </div>
            </div>
          </div>

          <div className="left-0 flex flex-col items-center justify-center gap-12 lg:flex-row lg:justify-around">
            <div className="flex max-w-[500px] flex-col items-center gap-4 text-xl uppercase lg:text-2xl">
              <div className="-ml-4 flex items-center rounded-full bg-[#0d0026] p-6 text-white lg:-ml-12 lg:mr-24">
                <p>Selecting between stats provider rigtch.fm or spotify</p>
              </div>
              <div className="g:ml-12 ml-6 flex items-center rounded-full bg-accent/90 p-6 text-white">
                <p>Top listened artists, tracks and genres</p>
              </div>
              <div className="mr-8 flex items-center rounded-full bg-[#276cdb] p-6 text-white lg:mr-12">
                <p>Selecting time range 4 weeks, 6 months or lifetime</p>
              </div>
            </div>

            <Image
              src="/statistics-spotify-example.png"
              alt="statistics example"
              className="rounded-lg shadow-2xl"
              width={450}
              height={1000}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-8 lg:mt-12">
            <h2 className="text-center text-2xl">
              Connect your spotify account to get your statistics.
            </h2>

            <ConnectButton className="rounded-xl border-2 border-accent bg-[linear-gradient(to_right,#9400d5_50%,#171717_50%)] bg-[length:200%_100%] bg-right-bottom px-10 py-5 text-lg transition-all duration-500 ease-out hover:bg-left-bottom" />
          </div>
        </main>
      </section>
    </div>
  )
}
