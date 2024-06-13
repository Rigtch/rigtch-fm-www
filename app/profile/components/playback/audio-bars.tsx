import { cn } from '@app/utils/cn'

export interface AudioBarsProps {
  isPlaying: boolean
}

export function AudioBars({ isPlaying = false }: AudioBarsProps) {
  return (
    <div className={cn('w-[28px] h-[28px] relative overflow-hidden')}>
      {Array.from({ length: 4 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            'w-[4px] h-[28px] absolute bg-white transition-all ease-linear',
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
