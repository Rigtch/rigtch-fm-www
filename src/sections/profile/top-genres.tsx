'use client'

import { GenreChip } from '@components/common/genre-chip'

export interface TopGenresSectionProps {
  genres: string[]
}

export function TopGenresSection({ genres }: TopGenresSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <header>
        <h2 className="text-5xl">Top genres</h2>
      </header>

      <main>
        <div className="flex flex-row flex-wrap gap-2">
          {genres?.map(genre => (
            <div key={genre}>
              <GenreChip genre={genre} />
            </div>
          ))}
        </div>
      </main>
    </section>
  )
}
