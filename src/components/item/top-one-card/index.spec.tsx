import { render, screen } from '@testing-library/react'
import { describe } from 'vitest'

import { TopOneItemCard, TopOneItemCardProps } from '.'

describe('TopOneElementCard', () => {
  const props: TopOneItemCardProps = {
    name: 'Element 1',
    image: 'image',
    href: 'href',
    genres: ['pop', 'rock', 'rap', 'hip-hop'],
  }

  test('should render component with props', () => {
    render(<TopOneItemCard {...props} />)

    expect(screen.getByText('Element 1')).toBeInTheDocument()
    expect(screen.getByText('pop')).toBeInTheDocument()
    expect(screen.getByText('rock')).toBeInTheDocument()
    expect(screen.getByText('rap')).toBeInTheDocument()
    expect(screen.queryByText('hip-hop')).not.toBeInTheDocument()
  })
})
