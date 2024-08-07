import type { TrackEntity } from '@app/api/types'

export const idExample = '4530c625-2385-45d6-8db1-8b867f125e30'

export const genresExample = ['Atmospheric Black Metal', 'Black Metal', 'Metal']

export const trackExample = {
  name: 'In Search for New Wisdom',
  href: 'https://open.spotify.com/track/0QBcteLxmPLG4gAXc1pEqW',
  album: {
    images: [
      {
        height: 300,
        width: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e02c84f17fc34c60240d9676c2f',
      },
    ],
  },
  artists: [
    {
      id: 'dec548ab-365f-4fe1-a2b9-c0ea52c9ff89',
      name: 'Eldamar',
    },
  ],
}

export const albumExample = {
  name: 'A Dark Forgotten Past',
  releaseDate: '2017-12-01T00:00:00.000Z',
  albumType: 'album',
  href: 'https://open.spotify.com/album/7gtPnEabb5TuGYn9pGLiz8',
  images: [
    {
      height: 300,
      width: 300,
      url: 'https://i.scdn.co/image/ab67616d00001e02c84f17fc34c60240d9676c2f',
    },
  ],
  genres: genresExample,
  artists: [
    {
      id: 'dec548ab-365f-4fe1-a2b9-c0ea52c9ff89',
      name: 'Eldamar',
    },
  ],
}

export const artistExample = {
  name: 'Eldamar',
  href: 'https://open.spotify.com/artist/dec548ab-365f-4fe1-a2b9-c0ea52c9ff89',
  images: [
    {
      height: 300,
      width: 300,
      url: 'https://i.scdn.co/image/ab67616d0000b2735fdcfafcc8e7831c5fe2c618',
    },
  ],
  genres: genresExample,
}

export const trackExampleFactory = (
  name: string,
  artistName: string,
  imageUrl: string
) =>
  ({
    id: '1',
    name,
    artists: [
      {
        name: artistName,
        id: '1',
        href: 'https://open.spotify.com/artist/1',
      },
    ],
    album: {
      images: [
        {
          url: imageUrl,
          width: 200,
          height: 200,
        },
      ],
    },
  }) as TrackEntity

export const trackExamples = [
  trackExampleFactory(
    'Djavulens tid ar kommen',
    'Dimhymn',
    'https://i.scdn.co/image/ab67616d0000b27359ca7635bbb1f478c24860e6'
  ),
  trackExampleFactory(
    'Lost in Liminal',
    'Kriegsmaschine',
    'https://i.scdn.co/image/ab67616d0000b2730909018befabc2acd69be483'
  ),
  trackExampleFactory(
    'The Pallid Scourge',
    'Kriegsmaschine',
    'https://i.scdn.co/image/ab67616d0000b2730909018befabc2acd69be483'
  ),
  trackExampleFactory(
    'Night Crawler',
    'Judas Priest',
    'https://i.scdn.co/image/ab67616d00001e0260db4ca924d17bc6754e89aa'
  ),
  trackExampleFactory(
    'Painkiller',
    'Judas Priest',
    'https://i.scdn.co/image/ab67616d00001e0260db4ca924d17bc6754e89aa'
  ),
]

export const playsExample = 115
export const maxPlaysExample = 1256
export const playtimeExample = 1000 * 60 * 60 * 4 + 1000 * 60 * 10
export const maxPlayTimeExample = 1000 * 60 * 60 * 6 + 1000 * 60 * 18
