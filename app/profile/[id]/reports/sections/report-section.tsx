import type { HtmlHTMLAttributes } from 'react'

import { cn } from '@app/utils/cn'

namespace ReportSection {
  export type Props = Readonly<
    Pick<HtmlHTMLAttributes<HTMLDivElement>, 'className' | 'children'>
  >
}

function ReportSection({ children, className }: ReportSection.Props) {
  return (
    <section
      className={cn(
        'flex flex-col justify-between gap-4 xl:flex-row',
        className
      )}
    >
      {children}
    </section>
  )
}

export { ReportSection }
