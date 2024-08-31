import type { HtmlHTMLAttributes } from 'react'

import { cn } from '@app/utils/cn'

namespace ReportSection {
  export type Props = Pick<
    HtmlHTMLAttributes<HTMLDivElement>,
    'className' | 'children'
  >
}

function ReportSection({ children, className }: ReportSection.Props) {
  return (
    <section
      className={cn(
        'flex flex-col lg:flex-row justify-between gap-4 px-4',
        className
      )}
    >
      {children}
    </section>
  )
}

export { ReportSection }
