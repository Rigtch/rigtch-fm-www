import { useAnalysisQuery } from '@api/hooks'
import { AnalysisCard } from '@components/analysis'

export function AnalysisSection() {
  const { data } = useAnalysisQuery()

  if (!data) return null

  return (
    <section className="flex-column flex w-full gap-2">
      <header>
        <h2 className="text-5xl">Analysis</h2>
      </header>

      <main className="flex-column flex w-full gap-4 md:gap-8">
        <AnalysisCard {...data} />
      </main>
    </section>
  )
}
