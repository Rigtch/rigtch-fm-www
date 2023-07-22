import { Avatar } from 'primereact/avatar'
import { Card } from 'primereact/card'

import { PlaybackCard } from '../playback/card'
import { OpenInSpotifyButton } from '../common'

import { useProfile } from '~/hooks/api'

export function ProfileCard() {
  const { data } = useProfile()

  if (!data) return null

  const {
    displayName,
    followers,
    href,
    images: [{ url: image }],
  } = data

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
              <OpenInSpotifyButton href={href} />
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
