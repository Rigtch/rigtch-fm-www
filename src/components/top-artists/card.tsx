import { Card } from 'primereact/card'

import { Artist } from '~/graphql/types/artist'

export function TopArtistsCard(topArtists: Artist[]) {
  console.log(topArtists)
  return (
    <Card>
      {/* {topArtists.map(({ name, genres, href }, index) => (
        <div key={index} className="flex flex-column">
          <span>{name}</span>
          {genres.map((genre, index) => (
            <span key={index}>{genre}</span>
          ))}
          <span>{href}</span>
        </div>
      ))} */}
    </Card>
  )
}
