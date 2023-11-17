import { FaStar } from 'react-icons/fa6'

import { stars } from './stars'
import { ItemImage } from './image'

import { cn } from '@utils/cn'
import { Badge } from '@components/ui/badge'

export interface TopOneItemCardProps {
  name: string
  image: string
  position?: number
  genres?: string[]
}

export function TopItemCard({
  name,
  image,
  position,
  genres,
}: TopOneItemCardProps) {
  return (
    <div
      className={cn(
        'w-full flex flex-col justify-start items-center gap-2',
        position === 1 ? 'md:h-[400px]' : 'md:h-[350px]'
      )}
    >
      <header className="w-full flex flex-col gap-2 items-center p-0">
        <div
          style={{
            backgroundImage: 'linear-gradient(to top right, #9400d5, #1e89ee)',
          }}
          className="p-1 rounded-xl"
        >
          <ItemImage src={image} alt={name} width="164" height="164" />
        </div>

        <span className="text-2xl font-bold">{name}</span>

        <div className="flex flex-col justify-center items-center gap-4">
          <span className="text-center text-5xl">{position}</span>

          <div className="flex flex-row gap-1">
            {stars.map((size, index) => (
              <FaStar
                key={index}
                className={cn(
                  position === 1
                    ? 'text-yellow-600'
                    : position === 2
                    ? 'text-slate-400'
                    : 'text-yellow-900',
                  `text-${size}xl`
                )}
              />
            ))}
          </div>
        </div>
      </header>

      <footer className="flex flex-row gap-2 flex-wrap justify-center w-full lg:w-64">
        {genres?.slice(0, 3).map((genre, index) => (
          <Badge key={index} className="text-slate-400">
            {genre}
          </Badge>
        ))}
      </footer>
    </div>
  )
}
