import type { ComponentProps } from 'react'
import { LuMoveUp, LuMoveDown } from 'react-icons/lu'

import { Card, CardContent, CardDescription } from '@app/components/ui/card'
import { cn } from '@app/utils/cn'

type StatCardValueSize = 'md' | 'lg' | 'xl'

namespace StatCard {
  export interface Props extends ComponentProps<typeof Card> {
    label: string
    valueSize?: StatCardValueSize
    value?: number
    lastWeekValue?: number
  }
}

function StatCard({
  label,
  children,
  value,
  lastWeekValue,
  valueSize = 'md',
  className,
  ...props
}: StatCard.Props) {
  const vsLastWeekPercent =
    lastWeekValue && value
      ? Math.floor(((value - lastWeekValue) / lastWeekValue) * 100)
      : undefined

  return (
    <Card
      className={cn(
        valueSize === 'xl'
          ? 'flex w-full flex-col items-center justify-center gap-2 p-4 sm:w-[400px]'
          : 'p-2',
        className
      )}
      {...props}
    >
      <CardDescription
        className={cn(
          'text-nowrap p-0',
          valueSize === 'xl' && 'text-lg font-semibold'
        )}
      >
        {label}
      </CardDescription>
      <CardContent>
        <p
          className={cn(
            valueSize === 'md' && 'text-2xl',
            valueSize === 'lg' && 'text-3xl',
            valueSize === 'xl' && 'ml-6 text-6xl'
          )}
        >
          {children}
        </p>

        {vsLastWeekPercent && (
          <p className="flex items-center gap-1 text-muted-foreground">
            {vsLastWeekPercent > 0 ? <LuMoveUp /> : <LuMoveDown />}
            {vsLastWeekPercent}% vs last week
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export { StatCard }
