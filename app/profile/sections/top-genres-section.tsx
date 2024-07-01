import { NoDataAlert } from '@app/components/common'
import { GenreChip } from '@app/components/items/genre'
import { DefaultSection, type DefaultSectionProps } from '@app/sections'

export interface TopGenresSectionProps
  extends Pick<DefaultSectionProps, 'children'> {
  items: string[]
}

export function TopGenresSection({ items, children }: TopGenresSectionProps) {
  return (
    <DefaultSection title="Top Genres" className="gap-12">
      {items.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2">
          {items.map(genre => (
            <div key={genre}>
              <GenreChip genre={genre} />
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && <NoDataAlert />}

      {children}
    </DefaultSection>
  )
}
