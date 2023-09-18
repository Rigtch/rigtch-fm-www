import { Card } from 'primereact/card'
import { classNames } from 'primereact/utils'
import { Skeleton } from 'primereact/skeleton'

import { ItemCardBaseProps, ItemCardColor, ItemCardSize } from './types'

import { OpenInSpotifyButton } from '@components/common'

export interface ItemCardSkeletonProps extends ItemCardBaseProps {
  hasArtists?: boolean
}

const { LARGE, SMALL } = ItemCardSize

export function ItemCardSkeleton({
  position,
  hasArtists,
  showGenres,
  color = ItemCardColor.SURFACE_CARD,
  size = SMALL,
}: ItemCardSkeletonProps) {
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
              hasArtists && 'gap-2'
            )}
          >
            <Skeleton height="2rem" width="10rem" />

            {hasArtists && <Skeleton width="7rem" />}

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
