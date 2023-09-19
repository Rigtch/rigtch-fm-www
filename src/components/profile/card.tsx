import { Card } from 'primereact/card'

import { PlaybackCard } from '../playback/card'
import { OpenInSpotifyButton } from '../common'

import { useProfileQuery } from '@api/hooks'
import { getImage } from '@utils/get-image'
import { AvatarComponent } from '@components/common/avatar'

export function ProfileCard() {
  const { data } = useProfileQuery()

  if (!data) return null

  const { displayName, followers, href, images } = data

  const image = getImage(images, 1)

  return (
    <Card>
      <div className="flex-column justify-content-between md:align-items-center flex gap-4 lg:flex-row">
        <header className="flex gap-4 p-2">
          <AvatarComponent
            image={image}
            label={displayName.slice(0, 1)}
            size="xlarge"
            style={{ width: '128px', height: '128px' }}
            pt={{
              label: {
                className: 'text-6xl',
              },
            }}
          />

          <div className="flex-column justify-content-center gap-2 flex">
            <div>
              <h2 className="m-0 text-5xl">{displayName}</h2>

              <p className="text-300 m-0 text-lg">{followers} Followers</p>
            </div>

            <OpenInSpotifyButton href={href} />
          </div>
        </header>

        <main>
          <PlaybackCard />
        </main>
      </div>
    </Card>
  )
}
