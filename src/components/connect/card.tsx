import { Card } from '@material-tailwind/react'
import Image from 'next/image'

import { ConnectButton } from './button'

import { spotifyLogo } from '@assets/images'

export function ConnectCard() {
  return (
    <Card className="w-full">
      <div className="align-items-center flex-column flex gap-4 md:flex-row p-2">
        <Image src={spotifyLogo} alt="Spotify's logo" width="128" />

        <div className="flex-column md:align-items-center flex gap-4 w-full">
          <div className="flex-column align-items-center flex gap-2 text-center">
            <h1 className="m-0">With just one press of a button</h1>

            <p className="m-0">
              You&apos;ll see your top artists, favorite songs and so on.
            </p>
          </div>

          <ConnectButton />
        </div>
      </div>
    </Card>
  )
}
