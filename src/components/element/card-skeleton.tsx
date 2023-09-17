import { Card } from 'primereact/card'
import { classNames } from 'primereact/utils'
import { Skeleton } from 'primereact/skeleton'

import { OpenInSpotifyButton } from '../common'

export enum ElementCardColor {
  SURFACE_GROUND = 'surface-ground',
  SURFACE_CARD = 'surface-card',
}

export enum ElementCardSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface ElementCardSkeletonProps {
  position?: number
  artists?: boolean
  showGenres?: boolean
  color?: ElementCardColor
  size?: ElementCardSize
}

const { LARGE, SMALL } = ElementCardSize

export function ElementCardSkeleton({
  position,
  artists,
  showGenres,
  color = ElementCardColor.SURFACE_CARD,
  size = SMALL,
}: ElementCardSkeletonProps) {
  return (
    <Card className={classNames(color, 'max-w-full')}>
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
            <Skeleton
              width={size === LARGE ? '76px' : '64px'}
              height={size === LARGE ? '76px' : '64px'}
            />
          </div>

          <div
            className={classNames(
              'flex-column justify-content-between flex min-w-0 w-full h-full',
              size === LARGE && 'flex-wrap',
              showGenres && 'gap-2',
              artists && 'gap-2'
            )}
          >
            <Skeleton height="2rem" width="10rem" />

            {artists && <Skeleton width="7rem" />}

            {showGenres && (
              <Skeleton borderRadius="10px" height="2rem" width="5rem" />
            )}
          </div>
        </header>

        <div className="flex-row hidden gap-3 md:flex align-self-end">
          <OpenInSpotifyButton href={''} />
        </div>
      </main>
    </Card>
  )
}
