import { Image } from 'primereact/image'
import { Card } from 'primereact/card'
import { Chip } from 'primereact/chip'
import { classNames } from 'primereact/utils'

import { OpenInSpotifyButton } from '../common'

import { Artist } from '~/graphql/types'
import { isMobile } from '~/utils/is-mobile'
import { getImage } from '~/utils/get-image'

export interface TopArtistCardProps {
  topArtist: Artist
  position: number
  showGenres?: boolean
}

export function TopArtistCard({
  topArtist: { name, href, images, genres },
  position,
  showGenres,
}: TopArtistCardProps) {
  return (
    <Card
      onClick={() => isMobile() && window.open(href, '_blank')}
      className="w-full"
    >
      <main
        className={classNames(
          'justify-content-between align-items-center flex flex-row',
          showGenres ? 'gap-4' : 'gap-1'
        )}
      >
        <header className="align-items-center flex flex-row gap-4">
          <span
            className={classNames(
              'w-2rem text-center',
              showGenres ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
            )}
          >
            {position}
          </span>

          <Image
            src={getImage(images)}
            alt={name}
            width={showGenres ? '76' : '64'}
            height={showGenres ? '76' : '64'}
            imageClassName="border-round-md"
          />

          <div className="flex-column justify-content-center flex flex-wrap gap-3">
            <div className="text-md md:text-2xl">{name}</div>

            {showGenres && (
              <div>
                <Chip label={genres[0]} />
              </div>
            )}
          </div>
        </header>

        <div className="flex-column justify-content-between align-items-end flex">
          <OpenInSpotifyButton href={href} className="hidden md:block" />
        </div>
      </main>
    </Card>
  )
}
