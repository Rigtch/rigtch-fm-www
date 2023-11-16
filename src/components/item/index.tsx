import Image from 'next/image'

import { OpenInSpotifyButton } from '@components/common'

export interface ItemProps {
  name: string
  image: string
  href?: string
  position?: number
}

export function Item({ name, image, href, position }: ItemProps) {
  return (
    <div className="flex flex-row justify-between p-2">
      <header className="flex flex-row items-center gap-6">
        <span className="text-center text-3xl w-[2rem]">{position}</span>

        <Image
          src={image}
          alt={''}
          width={64}
          height={64}
          className="rounded-md"
          style={{ height: '48px', width: '48px', objectFit: 'cover' }}
        />

        <h3 className="text-2xl">{name}</h3>
      </header>

      <div className="self-end">
        <OpenInSpotifyButton href={href ?? ''} />
      </div>
    </div>
  )
}

export * from './top-card'
