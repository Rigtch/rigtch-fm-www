import Image from 'next/image'

import { Card, CardHeader, CardTitle } from '@components/ui/card'

export interface TopOneItemCardProps {
  name: string
  image: string
  position?: number
}

export function TopItemCard({ name, image, position }: TopOneItemCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <span>{position}</span>
        <Image
          src={image}
          alt={''}
          width="84"
          height="84"
          className="rounded-md"
        />
        <CardTitle>{name}</CardTitle>
      </CardHeader>
    </Card>
  )
}
