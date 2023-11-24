import { render, screen } from '@testing-library/react'
import { mockDeep } from 'vitest-mock-extended'

import { Item } from './item'

import { TrackArtist } from '@app/api/types'

describe('Item', () => {
  const name = 'test'
  const image = '/test'

  test('should render with props', () => {
    render(<Item name={name} image={image} />)

    expect(screen.getByText(name)).toBeInTheDocument()
  })

  test('should render with position', () => {
    render(<Item name={name} image={image} position={1} />)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('should render with artists', () => {
    const firstArtistName = 'first'
    const secondArtistName = 'second'

    const artists = mockDeep<TrackArtist[]>([
      {
        name: firstArtistName,
        href: 'href',
      },
      {
        name: secondArtistName,
        href: 'href',
      },
    ])

    render(<Item name={name} image={image} artists={artists} />)

    expect(screen.getByText(firstArtistName)).toBeInTheDocument()
    expect(screen.getByText(secondArtistName)).toBeInTheDocument()
  })
})
