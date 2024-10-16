import type { ArtistEntity, TrackEntity } from '@app/api/types'

export const idExample = '4530c625-2385-45d6-8db1-8b867f125e30'

export const genresExample = ['Atmospheric Black Metal', 'Black Metal', 'Metal']

export const trackExample = {
  name: 'In Search for New Wisdom',
  href: 'https://open.spotify.com/track/0QBcteLxmPLG4gAXc1pEqW',
  album: {
    id: '1',
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
  genres: undefined,
}

export const trackExampleFactory = (
  id: string,
  name: string,
  artistName: string,
  imageUrl: string
) =>
  ({
    id,
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

export const artistExampleFactory = (name: string, imageUrl: string) =>
  ({
    id: '1',
    name,
    href: 'https://open.spotify.com/artist/1',
    images: [
      {
        url: imageUrl,
        width: 200,
        height: 200,
      },
    ],
  }) as ArtistEntity

export const trackExamples = [
  trackExampleFactory(
    '1',
    'Djavulens tid ar kommen',
    'Dimhymn',
    'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228'
  ),
  trackExampleFactory(
    '2',
    'Lost in Liminal',
    'Kriegsmaschine',
    'https://i.scdn.co/image/ab67616d0000b2730909018befabc2acd69be483'
  ),
  trackExampleFactory(
    '3',
    'The Pallid Scourge',
    'Kriegsmaschine',
    'https://i.scdn.co/image/ab67616d0000b2730909018befabc2acd69be483'
  ),
  trackExampleFactory(
    '4',
    'Night Crawler',
    'Judas Priest',
    'https://i.scdn.co/image/ab67616d00001e0260db4ca924d17bc6754e89aa'
  ),
  trackExampleFactory(
    '5',
    'Painkiller',
    'Judas Priest',
    'https://i.scdn.co/image/ab67616d00001e0260db4ca924d17bc6754e89aa'
  ),
]

export const artistExamples = [
  artistExampleFactory(
    'Carpathian Forest',
    'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228'
  ),
  artistExampleFactory(
    'Mushroomhead',
    'https://i.scdn.co/image/aed76c13983a7f90004b91cbf3e26fc41ea8f1e1'
  ),
  artistExampleFactory(
    'Godspeed You! Black Emperor',
    'https://i.scdn.co/image/11dab774bcf6b336054dd80928314efede79e956'
  ),
  artistExampleFactory(
    'Architects',
    'https://i.scdn.co/image/ab6761610000f178c849b02f9ed4ad1d458f1c81'
  ),
  artistExampleFactory(
    'Summoning',
    'https://i.scdn.co/image/e01b5fe641a470d650373e01cdd7dacffded018b'
  ),
]

export const playsExample = 115
export const maxPlaysExample = 1256
export const playtimeExample = 1000 * 60 * 60 * 4 + 1000 * 60 * 10
export const maxPlayTimeExample = 1000 * 60 * 60 * 6 + 1000 * 60 * 18
