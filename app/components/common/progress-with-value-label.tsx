'use client'

import { useState, useEffect } from 'react'

import { Progress } from '../ui/progress'

export interface ProgressWithValueLabelProps {
  value: number
  max: number
  label: string
  animate?: boolean
}

export function ProgressWithValueLabel({
  value,
  max,
  label,
  animate = false,
}: ProgressWithValueLabelProps) {
  const [progressValue, setProgressValue] = useState<number>(0)

  useEffect(() => {
    if (animate)
      setTimeout(() => {
        setProgressValue((value / max) * 100)
      }, 500)
    else setProgressValue((value / max) * 100)
  }, [value, max, animate])

  return (
    <div className="relative w-full">
      <Progress
        value={progressValue}
        className="*:transition-all *:duration-700 *:ease-in-out w-full h-7 bg-primary *:bg-[linear-gradient(to_top_right,#9400d5,#1e89ee)] overflow-hidden *:skew-x-12"
      />

      <div className="absolute top-[2px] left-[15px]">{label}</div>
    </div>
  )
}
