import { render, screen } from '@testing-library/react'
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended'

import { ProfileCard } from './card'

import { Profile } from '@app/api/types'

describe('ProfileCard', () => {
  const displayName = 'test'
  const followers = 2

  let profile: DeepMockProxy<Profile>

  beforeEach(() => {
    profile = mockDeep<Profile>({
      displayName,
      images: [],
      followers,
      href: 'href',
    })
  })

  test('should render with props', () => {
    render(<ProfileCard {...profile} />)

    expect(screen.getByText(displayName)).toBeInTheDocument()
    expect(screen.getByText(`${followers} Followers`)).toBeInTheDocument()
    expect(screen.getByText(displayName.slice(0, 1))).toBeInTheDocument()
  })
})
