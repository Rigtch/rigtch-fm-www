import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

import { SpotifyIcon } from '~/assets/svgs'
import { Profile } from '~/graphql'

export interface ProfileCardProps
  extends Pick<Profile, 'displayName' | 'href' | 'followers'> {
  image: string
}

export function Profilecard({
  displayName,
  href,
  followers,
  image,
}: ProfileCardProps) {
  return (
    <Card>
      <header className="flex gap-4 p-2">
        <Avatar
          image={image}
          shape="circle"
          style={{ width: '96px', height: '96px' }}
        />

        <div className="flex flex-column justify-content-between">
          <div>
            <h2 className="text-4xl m-0">{displayName}</h2>

            <p className="m-0 text-sm text-300">{followers} Followers</p>
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
    </Card>
  )
}
