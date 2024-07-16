'use client'

import { useState, useEffect } from 'react'

import { Progress } from '@app/components/ui/progress'
import { cn } from '@app/utils/cn'

namespace ProgressWithValueLabel {
  export interface Props {
    value: number
    max: number
    label: string
    animate?: boolean
  }
}

function ProgressWithValueLabel({
  value,
  max,
  label,
  animate = false,
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
    <div className="relative w-full">
      <Progress
        value={progressValue}
        className={cn(
          'w-full h-7 bg-primary *:bg-[linear-gradient(to_top_right,#9400d5,#1e89ee)] overflow-hidden *:skew-x-12',
          animate && '*:transition-all *:duration-700 *:ease-in-out'
        )}
      />

      <div className="absolute top-[2px] left-[15px]">{label}</div>
    </div>
  )
}

export { ProgressWithValueLabel }
