import { render } from '@testing-library/react'

import { ProfileAvatar } from './avatar'

describe('ProfileAvatar', () => {
  test('should match snapshot with image', () => {
    const view = render(
      <ProfileAvatar src="https://i.scdn.co/image/ab6775700000ee8503aef823b019723735326905" />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with fallback', () => {
    const view = render(<ProfileAvatar displayName="Mnigos" />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with size sm', () => {
    const view = render(<ProfileAvatar displayName="Mnigos" size="sm" />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with size lg', () => {
    const view = render(<ProfileAvatar displayName="Mnigos" size="lg" />)

    expect(view).toMatchSnapshot()
  })
})
