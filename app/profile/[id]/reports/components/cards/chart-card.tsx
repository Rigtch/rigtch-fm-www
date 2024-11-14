import type { HTMLAttributes } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card'
import { cn } from '@app/utils/cn'

namespace ChartCard {
  export type Props = Readonly<
    Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
      title: string
    }
  >
}

function ChartCard({ children, className, title }: ChartCard.Props) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="px-4 pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  )
}

export { ChartCard }
