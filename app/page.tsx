import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { LuChevronRight } from 'react-icons/lu'
import Link from 'next/link'

import { getServerUser } from './auth/utils'
import { ConnectButton } from './components/auth'
import { USER_ID } from './constants'
import Particles from './components/ui/particles'
import { BlurFade } from './components/ui/blur-fade'
import { ShineBorder } from './components/ui/shine-border'
import { Button } from './components/ui/button'
import { env } from './config/env'
import { ContainerScroll } from './components/ui/container-scroll'

export default async function HomePage() {
  const currentUser = await getServerUser()
  const userId = cookies().get(USER_ID)?.value

  if (currentUser && userId) redirect(`/profile/${userId}`)

  return (
    <div className="max-w-screen overflow-x-hidden bg-[linear-gradient(to_bottom_right,#0a0a0a,#171717)]">
      <div className="relative flex w-screen flex-col items-center gap-12 p-4 lg:gap-16">
        <Particles
          className="absolute inset-0 overflow-hidden"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />

        <main className="flex flex-col gap-12 p-4 md:pt-16 xl:pt-0">
          <section className="flex max-w-[450px] flex-col items-center justify-around gap-8 md:max-w-none md:flex-row xl:min-h-[90vh] xl:gap-32">
            <header className="flex flex-col gap-4">
              <div className="flex h-min items-center gap-4 rounded-lg p-2">
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

              <div className="flex flex-col gap-6">
                <h2 className="max-w-[600px] text-3xl font-semibold">
                  Dive into real time spotify statistics calculation based on
                  your listening history
                </h2>

                <div className="flex gap-4">
                  <ConnectButton className="rounded-lg border-2 border-accent bg-[linear-gradient(to_right,#9400d5_50%,transparent_50%)] bg-[length:200%_100%] bg-right-bottom px-10 py-5 transition-all duration-500 ease-out hover:bg-left-bottom" />

                  <Button
                    className="group bg-transparent px-10 py-5 shadow-none hover:bg-transparent"
                    asChild
                  >
                    <Link href={`/profile/${env.NEXT_PUBLIC_USER_ID}`}>
                      Example
                      <LuChevronRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </header>

            <BlurFade duration={0.8} inView>
              <ShineBorder
                color={['#9400d5', '#1e89ee', '#0a0a0a']}
                className="p-0"
              >
                <Image
                  src="/statistics-example.png"
                  alt="statistics example"
                  className="rounded-[6px] shadow-2xl"
                  width={450}
                  height={1000}
                />
              </ShineBorder>
            </BlurFade>
          </section>

          <section>
            <ContainerScroll
              titleComponent={
                <>
                  <h3 className="text-6xl font-semibold">
                    Discover your weekly reports
                  </h3>
                  <p className="text-xl">
                    Back to the day you connected your spotify account to
                    rigtch.fm
                  </p>
                </>
              }
            >
              <div>
                <Image
                  src="/statistics-reports-example.png"
                  alt="statistics example"
                  width={450}
                  height={1000}
                />
                <Image
                  src="/statistics-reports-example-2.png"
                  alt="statistics example"
                  width={450}
                  height={1000}
                />
              </div>
            </ContainerScroll>
          </section>

          <section className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-start md:justify-around">
            <header className="flex flex-col gap-4">
              <h3 className="text-6xl font-semibold">And many more like:</h3>
              <ul className="ml-4 max-w-[600px] list-disc space-y-2 text-lg">
                <li>
                  Taking a look at your top listened artists, albums, tracks and
                  genres
                </li>
                <li>
                  Exploring your listening history back to the day you connected
                  your spotify account to rigtch.fm
                </li>
                <li>
                  Adjust your stats to your own preferences with stats
                  measurement either by plays or playtime
                </li>
                <li>Select time range week, month and 3 months</li>
                <li>Share your statistics with your friends</li>
              </ul>
            </header>

            <Image
              src="/statistics-history-example.png"
              alt="statistics example"
              className="rounded-lg shadow-2xl"
              width={450}
              height={1000}
            />
          </section>
        </main>
      </div>
    </div>
  )
}
