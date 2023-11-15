import Image from 'next/image'

import { Card, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { OpenInSpotifyButton } from '@components/common'

export interface ItemCardProps {
  name: string
  image: string
  href?: string
  position?: number
}

export function ItemCard({ name, image, href, position }: ItemCardProps) {
  return (
    <Card className="flex flex-row justify-between">
      <CardHeader className="flex flex-row items-center gap-6">
        <span className="text-center text-4xl w-[2rem]">{position}</span>

        <Image
          src={image}
          alt={''}
          width="84"
          height="84"
          className="rounded-md"
          style={{ height: '84px' }}
        />

        <CardTitle className="text-2xl">{name}</CardTitle>
      </CardHeader>

      <CardFooter className="self-end p-4">
        <OpenInSpotifyButton href={href ?? ''} />
      </CardFooter>
    </Card>
  )
}
