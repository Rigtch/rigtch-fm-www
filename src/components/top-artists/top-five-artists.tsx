import { Card } from 'primereact/card'
import { Image } from 'primereact/image'
import { Chip } from 'primereact/chip'

import { OpenInSpotifyButton } from '../common'

import { Artist } from '~/graphql/types'
import { getImage } from '~/utils/get-image'
import { isMobile } from '~/utils/is-mobile'

export interface TopFiveArtistProps {
  topArtist: Artist
  index: number
}

export function TopFiveArtist({
  topArtist: { name, images, href, genres },
  index,
}: TopFiveArtistProps) {
  return (
    <Card
      onClick={() => isMobile() && window.open(href, '_blank')}
      style={{ backgroundColor: '#161d21' }}
    >
      <main className="justify-content-between align-items-center flex flex-row gap-4">
        <header className="align-items-center flex flex-row gap-4">
          <span className="w-2rem text-center text-4xl md:text-5xl">
            {index}
          </span>

          <Image
            src={getImage(images)}
            alt={name}
            width="76"
            height="76"
            imageClassName="border-round-md"
          />

          <div className="flex-column justify-content-center flex gap-3">
            <div className="text-xl md:text-2xl">{name}</div>

            <div className="flex flex-row gap-2">
              {genres.slice(0, 3).map((genre, index) => (
                <Chip key={index} label={genre} />
              ))}
            </div>
          </div>
        </header>

        <div className="flex-column justify-content-between align-items-end flex">
          <OpenInSpotifyButton href={href} className="hidden md:block" />
        </div>
      </main>
    </Card>
  )
}
