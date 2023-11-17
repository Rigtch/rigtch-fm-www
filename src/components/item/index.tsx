import { ItemImage } from './image'

import { cn } from '@utils/cn'
import { OpenInSpotifyButton } from '@components/common'

export interface ItemProps {
  name: string
  image: string
  href?: string
  artists?: string
  position?: number
}

export function Item({ name, image, href, position, artists }: ItemProps) {
  return (
    <div
      className={cn('flex flex-row justify-between p-2', !position && 'px-4')}
    >
      <header className="flex flex-row items-center gap-4">
        {position && (
          <span className="text-center text-3xl w-[2rem]">{position}</span>
        )}

        <ItemImage src={image} alt={name} width={48} height={48} />

        <div className="flex flex-col gap-2">
          <h3 className="text-2xl leading-none">{name}</h3>
          <h4 className="text-md leading-none text-primary-foreground/80">
            {artists}
          </h4>
        </div>
      </header>

      <div className="self-end">
        <OpenInSpotifyButton href={href ?? ''} />
      </div>
    </div>
  )
}

export * from './top-card'
