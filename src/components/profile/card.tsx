import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

import { PlaybackCard } from '../playback-card'

import { SpotifyIcon } from '~/assets/svgs'
import { Profile } from '~/graphql'

export interface ProfileCardProps
  extends Pick<Profile, 'displayName' | 'href' | 'followers'> {
  image: string
}

export function ProfileCard({
  displayName,
  href,
  followers,
  image,
}: ProfileCardProps) {
  return (
    <Card>
      <div className="flex-column justify-content-between flex gap-4 lg:flex-row">
        <header className="flex gap-4 p-2">
          <Avatar
            image={image}
            shape="circle"
            style={{ width: '96px', height: '96px' }}
          />

          <div className="flex-column justify-content-between flex">
            <div>
              <h2 className="m-0 text-4xl">{displayName}</h2>

              <p className="text-300 m-0 text-sm">{followers} Followers</p>
            </div>

            <div>
              <Button
                icon={<SpotifyIcon />}
                rounded
                text
                severity="success"
                tooltip="Open in Spotify"
                tooltipOptions={{ position: 'bottom' }}
                onClick={() => window.open(href, '_blank')}
                style={{ width: '28px', height: '28px' }}
              />
            </div>
          </div>
        </header>

        <main>
          <PlaybackCard />
        </main>
      </div>
    </Card>
  )
}
