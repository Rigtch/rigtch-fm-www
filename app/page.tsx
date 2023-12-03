import Image from 'next/image'

import { ConnectButton } from './components/connect'

export default function HomePage() {
  return (
    <div className="flex flex-col w-full justify-center items-center pt-12 gap-10">
      <div className="flex flex-col justify-center items-center gap-8">
        <h1 className="font-semibold text-5xl">Welcome to Rigtch.fm</h1>

        <h2 className="font-light text-2xl">
          Share your music interests with your friends
        </h2>

        <ConnectButton className="px-12 py-6 text-lg" variant="default" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full">
        <Image
          src="/rigtch-icon.png"
          alt={'spotify logo'}
          width={250}
          height={250}
          className="h-max rounded-xl"
        />

        <span className="select-none text-6xl md:text-[10vw] font-bold leading-none [-webkit-text-stroke:3px_currentcolor] [-webkit-text-fill-color:currentcolor] text-purple-500 text-opacity-70">
          rigtch.fm
        </span>
      </div>
    </div>
  )
}
