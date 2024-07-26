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
    <div className="max-w-screen bg-[linear-gradient(to_bottom_right,#0a0a0a,#171717)] overflow-x-hidden">
      <section className="w-screen p-4 flex flex-col gap-12 lg:gap-16">
        <header className="flex flex-col gap-8">
          <div className="flex items-center justify-center p-2 rounded-lg gap-4 h-min">
            <Image
              src="/rigtch-icon.png"
              alt={'spotify'}
              width={64}
              height={64}
              className="h-max rounded-xl"
            />

            <h1 className="text-5xl text-center">
              <span className="font-semibold">rigtch.fm</span>
            </h1>
          </div>

          <h2 className="text-xl font-semibold text-center">
            Real time spotify statistics calculation based on your listening
            history.
          </h2>
        </header>

        <main className="flex flex-col gap-12 p-4">
          <div className="flex flex-col lg:flex-row gap-12 justify-center lg:justify-around items-center left-0">
            <div className="flex flex-col items-center gap-4 max-w-[500px] text-xl lg:text-2xl uppercase">
              <div className="ml-4 mr-4 lg:ml-12 lg:mr-6 bg-accent/90 rounded-full p-6 text-white flex items-center">
                <p>Top listened artists, albums, tracks and genres</p>
              </div>
              <div className="-ml-4 lg:-ml-12 mr-12 bg-[#0d0026] rounded-full p-6 text-white flex items-center">
                <p>Selecting time range 7-90 days</p>
              </div>
              <div className="bg-[#276cdb] ml-8 lg:ml-16 lg:mr-12 rounded-full p-6 text-white flex items-center">
                <p>Share your statistics with your friends</p>
              </div>
            </div>

            <Image
              src="/statistics-example.png"
              alt="statistics example"
              className="shadow-2xl rounded-lg"
              width={450}
              height={1000}
            />
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-12 justify-center lg:justify-around items-center left-0">
            <Image
              src="/statistics-measurement-playtime-example.png"
              alt="statistics example"
              className="shadow-2xl rounded-lg"
              width={450}
              height={1000}
            />

            <div className="flex flex-col items-center gap-4 max-w-[500px] text-xl lg:text-2xl uppercase">
              <div className="bg-accent/90 mr-4 lg:mr-24 rounded-full p-6 text-white flex items-center">
                <p>Selecting measurements either plays or play time</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 justify-center lg:justify-around items-center left-0">
            <div className="flex flex-col items-center gap-4 max-w-[500px] text-xl lg:text-2xl uppercase">
              <div className="-ml-4 lg:-ml-12 lg:mr-24 bg-[#0d0026] rounded-full p-6 text-white flex items-center">
                <p>Selecting between stats provider rigtch.fm or spotify</p>
              </div>
              <div className="ml-6 g:ml-12 bg-accent/90 rounded-full p-6 text-white flex items-center">
                <p>Top listened artists, tracks and genres</p>
              </div>
              <div className="bg-[#276cdb] mr-8 lg:mr-12 rounded-full p-6 text-white flex items-center">
                <p>Selecting time range 4 weeks, 6 months or lifetime</p>
              </div>
            </div>

            <Image
              src="/statistics-spotify-example.png"
              alt="statistics example"
              className="shadow-2xl rounded-lg"
              width={450}
              height={1000}
            />
          </div>

          <div className="flex flex-col gap-8 justify-center items-center lg:mt-12">
            <h2 className="text-2xl text-center">
              Connect your spotify account to get your statistics.
            </h2>

            <ConnectButton className="px-10 py-5 text-lg rounded-xl transition-all duration-500 bg-[linear-gradient(to_right,#9400d5_50%,#171717_50%)] hover:bg-left-bottom bg-right-bottom ease-out bg-[length:200%_100%] border-2 border-accent" />
          </div>
        </main>
      </section>
    </div>
  )
}
