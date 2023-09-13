import { Chip } from 'primereact/chip'
import { Image } from 'primereact/image'
import { Badge } from 'primereact/badge'
import { classNames } from 'primereact/utils'
import { Skeleton } from 'primereact/skeleton'

import { OpenInSpotifyButton } from '../common'

import { isMobile } from '@utils/is-mobile'
import { Album } from '@api/types'

export interface TopOneElementCardProps {
  name: string
  image: string
  href: string
  genres?: string[]
  album?: Album
  skeleton?: boolean
}

export function TopOneElementCard({
  name,
  image,
  genres,
  href,
  album,
  skeleton,
}: TopOneElementCardProps) {
  const stars = [10, 15, 20, 15, 10]
  return (
    <div className="flex-column align-items-center flex gap-4 xl:w-4">
      <div
        style={{
          backgroundImage: 'linear-gradient(to top right, #9400d5, #1e89ee)',
        }}
        className="border-round-md p-2"
      >
        <div className="justify-content-center flex w-max">
          {skeleton ? (
            <Skeleton width="316px" height="316px" />
          ) : (
            <Image
              src={image}
              alt={album?.name}
              width="316"
              height="316"
              onClick={() => isMobile() && window.open(href, '_blank')}
            />
          )}
        </div>
      </div>

      <div className={classNames('flex flex-column', genres && 'gap-4')}>
        <div className="flex align-items-center flex-column gap-2">
          {skeleton ? (
            <Skeleton width="10rem" height="2rem" borderRadius="16px" />
          ) : (
            <div className="text-3xl text-white md:text-4xl text-center">
              {name}
            </div>
          )}

          <div className="relative flex flex-column align-items-center">
            <Badge value="1" size="xlarge" className="text-white surface-300" />
            <div className="flex flex-row absolute" style={{ bottom: '-10px' }}>
              {stars.map((size, index) => (
                <i
                  key={index}
                  className="pi pi-star-fill"
                  style={{
                    fontSize: size,
                    color: '#FCC200',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="justify-content-center flex flex-wrap gap-2">
          {genres &&
            genres
              .slice(0, 3)
              .map((genre, index) => <Chip key={index} label={genre} />)}

          {album && (
            <p className="text-2xl text-center">
              From album: <span className="text-700">{album.name}</span>
            </p>
          )}
        </div>

        <div className="flex align-self-center">
          <OpenInSpotifyButton href={href} />
        </div>
      </div>
    </div>
  )
}
