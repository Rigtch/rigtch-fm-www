import { ProgressBar } from 'primereact/progressbar'
import { ReactNode } from 'react'

export interface AnalysisCardItemProps {
  title: string
  value: number
  showValue?: boolean
  displayValueTemplate?: () => ReactNode
}

export function AnalysisCardItem({
  title,
  value,
  showValue = false,
  displayValueTemplate,
}: AnalysisCardItemProps) {
  return (
    <div className="col-12 md:col-4 flex flex-column gap-2">
      <header>
        <h2 className="text-xl m-0">{title}</h2>
      </header>

      <main className="w-full">
        <ProgressBar
          value={value}
          showValue={showValue}
          displayValueTemplate={displayValueTemplate}
        />
      </main>
    </div>
  )
}
