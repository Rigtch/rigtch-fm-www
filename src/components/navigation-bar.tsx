import Image from 'next/image'

import { ProfileInfo } from './profile'
import { ConnectButton } from './connect-button'

import { rigtchLogo } from '~/assets/images'
import { useAuth } from '~/hooks/auth'

export function NavigationBar() {
  const { isAuthorized, profile, disconnect, getProfileImage } = useAuth()

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
