import Image from 'next/image'
import { Button } from 'primereact/button'
import { useRouter } from 'next/router'

import { ProfileInfo } from './profile'

import { rigtchLogo } from '@assets/images'

export function NavigationBar() {
  const router = useRouter()

  return (
    <header className="surface-ground border-round-sm justify-content-between z-5 sticky top-0 flex px-4 py-2">
      <Button
        text
        severity="help"
        onClick={() => router.push('/')}
        className="align-items-center flex gap-4"
      >
        <Image
          src={rigtchLogo}
          alt="Rigtch"
          width={42}
          className="border-round-sm"
        />

        <p className="!m-0 text-xl font-normal text-white">Rigtch Music</p>
      </Button>

      <nav className="align-items-center flex gap-2">
        <ProfileInfo />
      </nav>
    </header>
  )
}
