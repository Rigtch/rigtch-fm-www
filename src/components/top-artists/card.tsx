import { Image } from 'primereact/image'
import { Card } from 'primereact/card'

import { OpenInSpotifyButton } from '../common'

import { Artist } from '~/graphql/types'
import { isMobile } from '~/utils/is-mobile'
import { getImage } from '~/utils/get-image'

export interface TopArtistCardProps {
  topArtist: Artist
  index: number
}

export function TopArtistCard({
  topArtist: { name, href, images },
  index,
}: TopArtistCardProps) {
  return (
    <Card onClick={() => isMobile() && window.open(href, '_blank')}>
      <main className="justify-content-between align-items-center flex flex-row gap-1">
        <header className="align-items-center flex flex-row gap-4">
          <span className="w-2rem text-center text-3xl md:text-4xl">
            {index}
          </span>

          <Image
            src={getImage(images)}
            alt={name}
            width="64"
            height="64"
            imageClassName="border-round-md"
          />

          <div className="text-xl md:text-2xl">{name}</div>
        </header>

        <div className="flex-column justify-content-between align-items-end flex">
          <OpenInSpotifyButton href={href} className="hidden md:block" />
        </div>
      </main>
    </Card>
  )
}
