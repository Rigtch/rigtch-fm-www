import type { ComponentProps } from 'react'
import { LuMoveUp, LuMoveDown, LuEqual } from 'react-icons/lu'

import { Card, CardContent, CardDescription } from '@app/components/ui/card'
import { cn } from '@app/utils/cn'

export type StatCardSize = 'md' | 'lg' | 'xl'

namespace StatCard {
  export type Props = Readonly<
    ComponentProps<typeof Card> & {
      label: string
      size?: StatCardSize
      value?: number
      lastWeekValue?: number
      contentClassName?: string
    }
  >
}

function StatCard({
  label,
  children,
  value,
  lastWeekValue,
  size = 'md',
  className,
  contentClassName,
  ...props
}: StatCard.Props) {
  const vsLastWeekPercent =
    lastWeekValue && value
      ? Math.floor(((value - lastWeekValue) / lastWeekValue) * 100)
      : undefined

  return (
    <Card
      className={cn(
        size === 'xl' &&
          'flex w-full flex-col items-center justify-center text-center sm:w-[400px] 2xl:w-full',
        'p-4',
        className
      )}
      {...props}
    >
      <CardDescription
        className={cn(
          'text-nowrap p-0',
          size === 'xl' && 'text-lg font-semibold'
        )}
      >
        {label}
      </CardDescription>
      <CardContent>
        <p
          className={cn(
            size === 'md' && 'text-2xl',
            size === 'lg' && 'text-3xl',
            size === 'xl' && 'text-6xl',
            contentClassName
          )}
        >
          {children}
        </p>

        {vsLastWeekPercent !== undefined && (
          <p className="flex items-center gap-1 text-muted-foreground">
            {vsLastWeekPercent > 0 ? (
              <LuMoveUp />
            ) : vsLastWeekPercent < 0 ? (
              <LuMoveDown />
            ) : (
              <LuEqual />
            )}
            {vsLastWeekPercent}% vs last week
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export { StatCard }
