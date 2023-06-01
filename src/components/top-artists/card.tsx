import Link from 'next/link'
import { Card } from 'primereact/card'
import { Image } from 'primereact/image'

import { SpotifyIcon } from '~/assets/svgs'
import { Artist } from '~/graphql/types'
import { getImage } from '~/utils/get-image'
import { isMobile } from '~/utils/is-mobile'

export interface TopArtistsCardProps {
  topArtist: Artist
  index: number
}

export function TopArtistsCard({
  topArtist: { name, href, images },
  index,
}: TopArtistsCardProps) {
  return (
    <>
      <Card onClick={() => isMobile() && window.open(href, '_blank')}>
        <div className="justify-content-between align-items-center flex flex-row gap-2">
          <div className="align-items-center justify-content-start flex flex-row gap-4">
            <header className="align-items-center justify-content-start flex flex-row gap-4">
              <span className="w-2rem md:w-3rem text-center text-2xl md:text-3xl">
                {index + 1}
              </span>

              <Image
                src={getImage(images)}
                alt={name}
                width="64"
                height="64"
                imageClassName="border-round-md"
              />
            </header>

            <main>
              <div className="text-md text-white md:text-2xl">{name}</div>
            </main>
          </div>

          <div className="hidden px-2 md:block">
            <Link href={href}>
              <SpotifyIcon />
            </Link>
          </div>
        </div>
      </Card>
    </>
  )
}
