import { Chip } from 'primereact/chip'
import { Image } from 'primereact/image'

import { OpenInSpotifyButton } from '../common'

import { Artist } from '~/graphql/types'
import { getImage } from '~/utils/get-image'

export interface TopOneArtistProps {
  topArtist: Artist
}

export function TopOneArtist({
  topArtist: { name, images, genres, href },
}: TopOneArtistProps) {
  return (
    <div className="flex-column align-items-center flex gap-2">
      <div
        style={{
          backgroundImage: 'linear-gradient(to top right, #9400d5, #1e89ee)',
        }}
        className="border-round-md p-2"
      >
        <div className="justify-content-center relative flex w-max">
          <Image
            src={getImage(images)}
            alt={name}
            width="296"
            height="296"
            imageClassName="border-round-md"
          />

          <div
            className="absolute left-0 p-1"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              borderTopLeftRadius: '0.375rem',
              borderBottomRightRadius: '0.375rem',
            }}
          >
            <span className="text-2xl">1</span>
          </div>

          <div
            className="absolute right-0 hidden p-1 md:block"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              borderTopRightRadius: '0.375rem',
              borderBottomLeftRadius: '0.375rem',
            }}
          >
            <OpenInSpotifyButton href={href} />
          </div>

          <div className="absolute" style={{ bottom: '4px' }}>
            {[40, 50, 60, 50, 40].map((size, index) => (
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

      <div className="text-3xl text-white md:text-4xl">{name}</div>

      <div className="justify-content-center flex flex-wrap gap-2">
        {genres.slice(0, 3).map((genre, index) => (
          <Chip key={index} label={genre} />
        ))}
      </div>
    </div>
  )
}
