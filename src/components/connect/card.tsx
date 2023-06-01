import { Card } from 'primereact/card'
import Image from 'next/image'

import { ConnectButton } from './button'

import { spotifyLogo } from '~/assets/images'

export function ConnectCard() {
  return (
    <Card>
      <div className="align-items-center flex-column flex gap-4 md:flex-row">
        <Image src={spotifyLogo} alt="Spotify's logo" width="128" />

        <div className="flex-column md:align-items-center flex gap-4">
          <div className="flex-column align-items-center flex gap-2 text-center">
            <h1 className="m-0">Welcome to Rigtch Music</h1>

            <p className="m-0">
              Connect your spotify account to see statistics
            </p>
          </div>

          <ConnectButton />
        </div>
      </div>
    </Card>
  )
}
