import { Badge } from 'primereact/badge'
import { classNames } from 'primereact/utils'
import { Skeleton } from 'primereact/skeleton'

import { OpenInSpotifyButton } from '../../common'

import { stars } from './stars'

export interface TopOneItemCardSkeletonProps {
  hasGenres?: boolean
  hasAlbum?: boolean
}

export function TopOneItemCardSkeleton({
  hasGenres,
  hasAlbum,
}: TopOneItemCardSkeletonProps) {
  return (
    <div className="flex-column align-items-center flex gap-4 xl:w-4">
      <div
        style={{
          backgroundImage: 'linear-gradient(to top right, #9400d5, #1e89ee)',
        }}
        className="border-round-md p-2"
      >
        <div className="justify-content-center flex w-max">
          <Skeleton width="316px" height="316px" />
        </div>
      </div>

      <div className={classNames('flex flex-column', hasGenres && 'gap-4')}>
        <div className="flex align-items-center flex-column gap-2">
          <Skeleton width="10rem" height="2rem" />

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
          <div className="flex flex-row gap-1">
            {hasGenres &&
              Array.from({ length: 3 }).map((item, index) => (
                <Skeleton
                  width="6rem"
                  height="2rem"
                  borderRadius="16px"
                  key={index}
                />
              ))}
          </div>

          {hasAlbum && <Skeleton height="2rem" className="my-4" />}
        </div>

        <div className="flex align-self-center">
          <OpenInSpotifyButton href={''} />
        </div>
      </div>
    </div>
  )
}
