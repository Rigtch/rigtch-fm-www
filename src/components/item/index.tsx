import { ItemImage } from './image'

import { cn } from '@utils/cn'
import { OpenInSpotifyButton, RelativeTime } from '@components/common'
import { TrackArtist } from '@api/types'

export interface ItemProps {
  name: string
  image: string
  href?: string
  artists?: TrackArtist[]
  playedAt?: string
  position?: number
}

export function Item({
  name,
  image,
  href,
  position,
  artists,
  playedAt,
}: ItemProps) {
  return (
    <div
      className={cn(
        'flex flex-row justify-between p-2 gap-2 md:gap-4',
        !position && 'md:px-4'
      )}
    >
      <header className="flex flex-row items-center gap-4 w-full">
        {position && (
          <span className="text-center text-3xl w-[2rem]">{position}</span>
        )}

        <ItemImage src={image} alt={name} width={48} height={48} />

        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-xl md:text-2xl leading-none">{name}</h3>

          <div className="flex justify-between w-full">
            {artists && (
              <h4 className="text-md leading-none text-primary-foreground/80">
                {artists?.map(({ name }) => name).join(', ')}
              </h4>
            )}

            {playedAt && (
              <RelativeTime
                value={playedAt ?? ''}
                className="text-sm md:text-md"
              />
            )}
          </div>
        </div>
      </header>

      <div className="self-end">
        <OpenInSpotifyButton href={href ?? ''} />
      </div>
    </div>
  )
}

export * from './image'
export * from './top-card'
