import { Progress } from '../ui/progress'

export interface ProgressWithValueLabelProps {
  value: number
  max: number
  label: string
}

export function ProgressWithValueLabel({
  value,
  max,
  label,
}: ProgressWithValueLabelProps) {
  return (
    <div className="relative w-full">
      <Progress
        value={(value / max) * 100}
        className="w-full h-7 bg-primary *:bg-[linear-gradient(to_top_right,#9400d5,#1e89ee)] overflow-hidden *:skew-x-12"
      />

      <div className="absolute top-[2px] left-[15px]">{label}</div>
    </div>
  )
}
