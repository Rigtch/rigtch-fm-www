import { Chip } from 'primereact/chip'

import { useTopGenresQuery } from '@hooks/api'

export function TopGenresSection() {
  const { data } = useTopGenresQuery()

  if (!data) return null

  return (
    <section>
      <header>
        <h2 className="text-4xl">Top genres</h2>
      </header>

      <main className="flex flex-wrap gap-1">
        {data.genres.map(genre => (
          <Chip key={genre} label={genre} />
        ))}
      </main>
    </section>
  )
}
