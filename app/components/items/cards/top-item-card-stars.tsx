import { IoStarOutline, IoStar } from 'react-icons/io5'

import type { ItemTopCard } from './item-top-card'

import { cn } from '@app/utils/cn'

export function ItemTopCardStars({
  position,
}: Required<Pick<ItemTopCard.Props, 'position'>>) {
  const stars = [1, 2, 3, 2, 1]

  enum Color {
    GOLD = 'text-yellow-600',
    SILVER = 'text-slate-400',
    BRONZE = 'text-yellow-900',
  }

  return (
    <>
      {stars.map(size => (
        <>
          {[2, 3].includes(position) && size === 1 && (
            <IoStarOutline
              className={cn(position === 3 ? Color.BRONZE : Color.SILVER)}
              style={{
                fontSize: `${size * 14}px`,
                marginTop: `-${size * 4}px`,
              }}
            />
          )}

          {position === 1 && size === 1 && (
            <IoStar
              className={Color.GOLD}
              style={{
                fontSize: `${size * 14}px`,
                marginTop: `-${size * 4}px`,
              }}
            />
          )}

          {position === 3 && size === 2 && (
            <IoStarOutline
              className={Color.BRONZE}
              style={{
                fontSize: `${size * 14}px`,
                marginTop: `-${size * 4}px`,
              }}
            />
          )}

          {[1, 2].includes(position) && size === 2 && (
            <IoStar
              className={cn(position === 1 ? Color.GOLD : Color.SILVER)}
              style={{
                fontSize: `${size * 14}px`,
                marginTop: `-${size * 4}px`,
              }}
            />
          )}

          {size === 3 && (
            <IoStar
              className={cn(
                position === 1
                  ? Color.GOLD
                  : position === 2
                    ? Color.SILVER
                    : Color.BRONZE
              )}
              style={{
                fontSize: `${size * 14}px`,
                marginTop: `-${size * 4}px`,
              }}
            />
          )}
        </>
      ))}
    </>
  )
}
