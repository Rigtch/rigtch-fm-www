import { cn } from '@app/utils/cn'

function AudioBars() {
  return (
    <div className={cn('relative h-[28px] w-[28px] overflow-hidden')}>
      {Array.from({ length: 4 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            'absolute h-[28px] w-[4px] animate-up-down bg-white transition-all ease-linear',
            index === 0 && 'left-0',
            index === 1 && 'left-[8px] animation-delay-[0.6s]',
            index === 2 && 'left-[16px] animation-delay-[0.3s]',
            index === 3 && 'left-[24px] animation-delay-[0.9s]'
          )}
        />
      ))}
    </div>
  )
}

export { AudioBars }
