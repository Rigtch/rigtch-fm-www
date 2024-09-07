import { cn } from '@app/utils/cn'

namespace AudioBars {
  export interface Props {
    isPlaying: boolean
  }
}

function AudioBars({ isPlaying = false }: AudioBars.Props) {
  return (
    <div className={cn('relative h-[28px] w-[28px] overflow-hidden')}>
      {Array.from({ length: 4 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            'absolute h-[28px] w-[4px] bg-white transition-all ease-linear',
            index === 0 && 'left-0',
            index === 1 && 'left-[8px]',
            index === 1 && isPlaying && 'animation-delay-[0.6s]',
            index === 2 && 'left-[16px]',
            index === 2 && isPlaying && 'animation-delay-[0.3s]',
            index === 3 && 'left-[24px]',
            index === 3 && isPlaying && 'animation-delay-[0.9s]',
            isPlaying && 'animate-up-down'
          )}
        />
      ))}
    </div>
  )
}

export { AudioBars }
