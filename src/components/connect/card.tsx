import { Card } from 'primereact/card'
import Image from 'next/image'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { ConnectButton } from './button'

import { spotifyLogo } from '@assets/images'
import { useProfileQuery } from '@api/hooks'
import { getImage } from '@utils/get-image'

export function ConnectCard() {
  const router = useRouter()
  const { data } = useProfileQuery()
  const [welcomeBackMessage, setWelcomeBackMessage] = useState('')

  const welcomeBackMessages = [
    'Back so soon?',
    'We missed you!',
    'Glad to see you!',
    'Your artists are waiting...',
  ]

  useEffect(() => {
    setWelcomeBackMessage(
      welcomeBackMessages[
        Math.floor(Math.random() * welcomeBackMessages.length)
      ]
    )
  }, [])

  return (
    <Card className="w-full">
      <div className="align-items-center flex-column flex gap-4 md:flex-row p-2">
        {data?.displayName ? (
          <div>
            <Avatar
              image={getImage(data?.images, 1) ?? spotifyLogo.src}
              size="xlarge"
              label={data?.displayName.slice(0, 1)}
              shape="circle"
              style={{ width: '128px', height: '128px' }}
              className="border-circle"
              pt={{
                label: {
                  className: 'text-6xl',
                },
              }}
            />
          </div>
        ) : (
          <Image src={spotifyLogo} alt="Spotify's logo" width="128" />
        )}

        <div className="flex-column md:align-items-center flex gap-4 w-full">
          <div className="flex-column align-items-center flex gap-2 text-center">
            <h1 className="m-0">
              {data?.displayName
                ? `Welcome back ${data.displayName}!`
                : 'With just one press of a button'}
            </h1>

            {data?.displayName ? (
              <>
                <span className="text-2xl">{welcomeBackMessage}</span>
                <p className="m-0">
                  Press the button below to open your profile
                </p>
              </>
            ) : (
              <p className="m-0">
                With just one press of a button you&apos;ll see your top
                artists, favorite songs and so on
              </p>
            )}
          </div>

          {data?.displayName ? (
            <Button severity="info" onClick={() => router.push('/profile')}>
              Profile
            </Button>
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </Card>
  )
}
