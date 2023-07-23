import Image from 'next/image'

import { ProfileInfo } from './profile'

import { rigtchLogo } from '@assets/images'

export function NavigationBar() {
  return (
    <header className="surface-ground border-round-sm justify-content-between z-5 sticky top-0 flex px-4 py-2">
      <div className="align-items-center flex gap-4">
        <Image
          src={rigtchLogo}
          alt="Rigtch"
          width={42}
          className="border-round-sm"
        />

        <p className="!m-0 text-xl font-normal">Rigtch Music</p>
      </div>

      <nav className="align-items-center flex gap-2">
        <ProfileInfo />
      </nav>
    </header>
  )
}
