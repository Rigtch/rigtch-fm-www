import { Card } from 'primereact/card'
import { Image } from 'primereact/image'
import { classNames } from 'primereact/utils'
import { Chip } from 'primereact/chip'

import { OpenInSpotifyButton } from '../common'
import { RelativeTime } from '../utils'

import { Album, Artist, TrackArtist } from '@api/types'
import { getArtists } from '@utils/get-artists'
import { isMobile } from '@utils/is-mobile'

export enum ElementCardColor {
  SURFACE_GROUND = 'surface-ground',
  SURFACE_CARD = 'surface-card',
}

export enum ElementCardSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface ElementCardProps {
  position?: number
  name: string
  image: string
  href: string
  album?: Album
  artists?: (Artist | TrackArtist)[]
  playedAt?: string
  genres?: string[]
  showFromAlbum?: boolean
  showGenres?: boolean
  color?: ElementCardColor
  size?: ElementCardSize
}

const { LARGE, MEDIUM, SMALL } = ElementCardSize

export function ElementCard({
  position,
  image,
  name,
  album,
  artists,
  href,
  playedAt,
  genres,
  showFromAlbum,
  showGenres,
  color = ElementCardColor.SURFACE_CARD,
  size = SMALL,
}: ElementCardProps) {
  return (
    <Card
      onClick={() => isMobile() && window.open(href, '_blank')}
      className={color}
    >
      <main
        className={classNames(
          'justify-content-between align-items-end md:align-items-center flex w-full flex-column md:flex-row',
          size === LARGE ? 'md:gap-4' : 'md:gap-3'
        )}
      >
        <header className="align-items-center flex gap-4 w-full md:w-5">
          {position && (
            <span
              className={classNames(
                'w-2rem text-center',
                size === LARGE ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
              )}
            >
              {position}
            </span>
          )}

          <Image
            src={image}
            alt={album?.name ?? name}
            width={size === LARGE ? '76' : '64'}
            height={size === LARGE ? '76' : '64'}
            imageClassName="border-round-md"
          />

          <div
            className={classNames(
              'flex-column justify-content-center flex min-w-0 w-6',
              size === LARGE && 'flex-wrap gap-3'
            )}
          >
            <p
              className={classNames(
                'm-0 text-xl line-height-3 max-h-4rem max-w-full white-space-nowrap text-white overflow-hidden text-overflow-ellipsis',
                [MEDIUM, LARGE].includes(size) && 'md:text-2xl'
              )}
            >
              {name}
            </p>

            {artists && (
              <p className="text-400 m-0 line-height-3 max-h-4rem max-w-full white-space-nowrap overflow-hidden text-overflow-ellipsis">
                {getArtists(artists)}
              </p>
            )}

            {showGenres && genres && (
              <div>
                <Chip label={genres[0]} />
              </div>
            )}
          </div>
        </header>

        <div
          className={classNames(
            'align-items-center flex flex-row w-6',
            showFromAlbum ? 'justify-content-between' : 'justify-content-end'
          )}
        >
          {showFromAlbum && album && (
            <div className="flex-column md:flex hidden">
              <p className="m-0 text-xl text-white">From album:</p>
              <p className="text-400 m-0">{album.name}</p>
            </div>
          )}

          <div className="flex-row hidden gap-3 md:flex">
            {playedAt && <RelativeTime value={playedAt ?? ''} />}

            <OpenInSpotifyButton href={href} />
          </div>
        </div>
      </main>
    </Card>
  )
}
