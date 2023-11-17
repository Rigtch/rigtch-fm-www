import { Track } from '@api/types'
import { Item } from '@components/item'
import { Separator } from '@components/ui/separator'

export interface RecentlyPlayedSectionProps {
  items: Track[]
}

export function RecentlyPlayedSection({ items }: RecentlyPlayedSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <header>
        <h2 className="text-5xl">Recently played</h2>
      </header>

      <main>
        <div className="flex flex-col justify-center gap-5">
          <div className="flex flex-col gap-2">
            {items.map(({ album, artists, ...tracks }, index) => (
              <div key={tracks.id}>
                <Item
                  {...tracks}
                  image={album.images[0].url}
                  artists={artists.map(({ name }) => name).join(', ')}
                />

                {index !== items.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  )
}
