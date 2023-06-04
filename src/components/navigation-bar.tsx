import Image from 'next/image'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

import { ProfileInfo } from './profile'
import { ConnectButton } from './connect'

import { rigtchLogo } from '~/assets/images'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/common/constants'
import { client } from '~/config'
import { DefaultPageProps } from '~/pages/_app'
import { getImage } from '~/utils/get-image'

export type NavigationBarProps = DefaultPageProps

export function NavigationBar({ profile }: NavigationBarProps) {
  const [, , removeCookies] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN])
  const router = useRouter()

  function disconnect() {
    removeCookies(ACCESS_TOKEN)
    removeCookies(REFRESH_TOKEN)

    client.resetStore()

    router.push('/about')
  }

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
        {profile ? (
          <ProfileInfo
            {...profile}
            disconnect={disconnect}
            image={getImage(profile.images)}
          />
        ) : (
          <ConnectButton />
        )}
      </nav>
    </header>
  )
}
