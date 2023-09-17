import { Card } from 'primereact/card'
import { Image } from 'primereact/image'
import { classNames } from 'primereact/utils'
import { Chip } from 'primereact/chip'
import { Skeleton } from 'primereact/skeleton'

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
  name?: string
  image?: string
  href?: string
  album?: Album
  artists?: (Artist | TrackArtist)[]
  playedAt?: string
  genres?: string[]
  showGenres?: boolean
  color?: ElementCardColor
  size?: ElementCardSize
  skeleton?: boolean
}

const { LARGE, MEDIUM, SMALL } = ElementCardSize

// eslint-disable-next-line sonarjs/cognitive-complexity
export function ElementCard({
  position,
  image,
  name,
  album,
  artists,
  href,
  playedAt,
  genres,
  showGenres,
  color = ElementCardColor.SURFACE_CARD,
  size = SMALL,
  skeleton,
}: ElementCardProps) {
  return (
    <Card
      onClick={() => isMobile() && window.open(href, '_blank')}
      className={classNames(color, 'max-w-full')}
    >
      <main
        className={classNames(
          'justify-content-between align-items-end md:align-items-center flex w-full flex-column md:flex-row',
          size === LARGE ? 'md:gap-4' : 'md:gap-3'
        )}
      >
        <header
          className={classNames(
            'align-items-center flex w-full md:w-10 gap-3 md:gap-4'
          )}
        >
          {position && (
            <span
              className={classNames(
                'text-center',
                size === LARGE
                  ? 'text-4xl md:text-5xl w-2rem'
                  : 'text-3xl md:text-4xl w-4rem'
              )}
            >
              {position}
            </span>
          )}

          <div>
            {skeleton ? (
              <Skeleton
                width={size === LARGE ? '76px' : '64px'}
                height={size === LARGE ? '76px' : '64px'}
              />
            ) : (
              <Image
                src={image}
                alt={album?.name}
                width={size === LARGE ? '76' : '64'}
                height={size === LARGE ? '76' : '64'}
              />
            )}
          </div>

          <div
            className={classNames(
              'flex-column justify-content-between flex min-w-0 w-full h-full',
              size === LARGE && 'flex-wrap',
              album && 'gap-0',
              genres && 'gap-2',
              artists && skeleton && 'gap-2'
            )}
          >
            {skeleton ? (
              <Skeleton height="2rem" width="10rem" />
            ) : (
              <p
                className={classNames(
                  'm-0 text-xl line-height-3 max-h-4rem max-w-full white-space-nowrap text-white overflow-hidden text-overflow-ellipsis',
                  [MEDIUM, LARGE].includes(size) && 'md:text-2xl'
                )}
              >
                {name}
              </p>
            )}

            {artists &&
              (skeleton ? (
                <Skeleton width="7rem" />
              ) : (
                <p className="text-400 m-0 line-height-3 max-h-4rem max-w-full white-space-nowrap overflow-hidden text-overflow-ellipsis">
                  {getArtists(artists)}
                </p>
              ))}

            {showGenres && genres && (
              <div>
                {skeleton ? (
                  <Skeleton borderRadius="10px" height="2rem" width="5rem" />
                ) : (
                  <Chip
                    label={genres[0]}
                    className="white-space-nowrap text-overflow-ellipsis max-w-full"
                  />
                )}
              </div>
            )}
          </div>
        </header>

        <div className="flex-row hidden gap-3 md:flex align-self-end">
          {playedAt && <RelativeTime value={playedAt ?? ''} />}

          <OpenInSpotifyButton href={href ?? ''} />
        </div>
      </main>
    </Card>
  )
}
