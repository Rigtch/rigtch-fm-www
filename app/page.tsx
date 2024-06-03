import Image from 'next/image'

import { ConnectButton } from './components/connect'
import { getServerUser } from './api/auth'

export default async function HomePage() {
  const currentUser = await getServerUser()

  return (
    <div className="flex flex-col w-full justify-center items-center pt-12 gap-24 h-[80vh]">
      <header className="flex flex-col justify-center items-center gap-8 px-4 md:p-0">
        <h1 className="font-semibold text-5xl text-center">
          {currentUser
            ? `Welcome back ${currentUser.name}!`
            : 'Welcome to rigtch.fm'}
        </h1>

        <h2 className="font-light text-2xl text-center">
          {currentUser
            ? "We've been waiting for you!"
            : 'Share your music interests with your friends'}
        </h2>

        <ConnectButton className="px-12 py-6 text-lg" variant="default" />
      </header>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full">
        <Image
          src="/rigtch-icon.png"
          alt={'spotify'}
          width={150}
          height={150}
          className="h-max rounded-xl"
        />

        <span className="select-none text-6xl md:text-[10vw] font-bold leading-none [-webkit-text-stroke:3px_currentcolor] [-webkit-text-fill-color:currentcolor] text-purple-500 text-opacity-70">
          rigtch.fm
        </span>
      </div>
    </div>
  )
}
