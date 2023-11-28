import Image from 'next/image'

import { HomeItemCard } from './components/common/home-card'

export default function HomePage() {
  return (
    <div className="flex flex-col w-full items-center py-4 gap-[100px]">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full h-full pt-24">
        <Image
          src="/rigtch-icon.png"
          alt={'spotify logo'}
          width={400}
          height={400}
          className="h-max rounded-xl"
        />

        <span className="select-none text-6xl md:text-[10vw] font-bold leading-none uppercase [-webkit-text-stroke:3px_currentcolor] [-webkit-text-fill-color:currentcolor] text-purple-500 text-opacity-70">
          Rigtch
        </span>
      </div>

      <div className="w-3/4">
        <HomeItemCard />
      </div>
    </div>
  )
}
