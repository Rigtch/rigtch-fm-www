import Image from 'next/image'

import { ProfileInfo } from './profile'
import { ConnectButton } from './connect-button'

import { rigtchLogo } from '~/assets/images'
import { useAuth } from '~/hooks/auth'

export function NavigationBar() {
  const { isAuthorized, profile, disconnect, getProfileImage } = useAuth()

  return (
    <header className="flex px-4 py-2 surface-ground border-round-sm justify-content-between sticky top-0 z-5">
      <div className="flex align-items-center gap-4">
        <Image
          src={rigtchLogo}
          alt="Rigtch"
          width={42}
          className="border-round-sm"
        />

        <p className="font-normal text-xl !m-0">Rigtch Music</p>
      </div>

      <nav className="flex align-items-center gap-2">
        {isAuthorized && profile ? (
          <ProfileInfo
            {...profile}
            disconnect={disconnect}
            image={getProfileImage() ?? ''}
          />
        ) : (
          <ConnectButton />
        )}
      </nav>
    </header>
  )
}
