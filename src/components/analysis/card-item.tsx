import { ProgressBar } from 'primereact/progressbar'
import { ReactNode } from 'react'

export interface AnalysisCardItemProps {
  title: string
  description: string
  value: number
  showValue?: boolean
  displayValueTemplate?: () => ReactNode
}

export function AnalysisCardItem({
  title,
  description,
  value,
  showValue = false,
  displayValueTemplate,
}: AnalysisCardItemProps) {
  return (
    <div className="col-12 md:col-4 flex flex-column gap-2 h-full">
      <header>
        <h2 className="text-xl m-0">{title}</h2>
      </header>

      <main className="w-full">
        <ProgressBar
          value={value}
          showValue={showValue}
          displayValueTemplate={displayValueTemplate}
        />

        <p className="my-1 text-400">{description}</p>
      </main>
    </div>
  )
}
