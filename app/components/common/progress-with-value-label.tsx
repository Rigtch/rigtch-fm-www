'use client'

import { useState, useEffect } from 'react'

import { Progress } from '@app/components/ui/progress'
import { cn } from '@app/utils/cn'

namespace ProgressWithValueLabel {
  export type Props = Readonly<{
    value: number
    max: number
    label: string
    animate?: boolean
    className?: string
  }>
}

function ProgressWithValueLabel({
  value,
  max,
  label,
  animate = false,
  className,
}: ProgressWithValueLabel.Props) {
  const defaultProgressValue = (value / max) * 100

  const [progressValue, setProgressValue] = useState<number>(
    animate ? 0 : defaultProgressValue
  )

  useEffect(() => {
    if (animate)
      setTimeout(() => {
        setProgressValue(defaultProgressValue)
      }, 200)
  }, [value, max, animate, defaultProgressValue])

  return (
    <div className={cn('relative w-full', className)}>
      <Progress
        value={progressValue}
        className={cn(
          'h-7 w-full overflow-hidden bg-primary *:skew-x-12 *:bg-[linear-gradient(to_top_right,#9400d5,#1e89ee)]',
          animate && '*:transition-all *:duration-700 *:ease-in-out'
        )}
      />

      <div className="absolute left-[15px] top-[2px]">{label}</div>
    </div>
  )
}

export { ProgressWithValueLabel }
