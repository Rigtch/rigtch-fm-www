import { Chip } from 'primereact/chip'

export interface TopGenresSectionProps {
  genres: string[]
}

export function TopGenresSection({ genres }: TopGenresSectionProps) {
  return (
    <section>
      <header>
        <h2 className="text-4xl">Top genres</h2>
      </header>

      <main className="flex flex-wrap gap-1">
        {genres.map(genre => (
          <Chip key={genre} label={genre} />
        ))}
      </main>
    </section>
  )
}
