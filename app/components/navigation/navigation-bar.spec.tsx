import { render } from '@testing-library/react'

import { NavigationBar } from './navigation-bar'

import { QueryClientWrapper } from '@tests/utils'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/profile'),
}))

describe('NavigationBar', () => {
  test('should match snapshot as unauthenticated', () => {
    const view = render(<NavigationBar />, {
      wrapper: QueryClientWrapper,
    })

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as authenticated', () => {
    const view = render(
      <NavigationBar
        user={{
          name: 'John Doe',
          id: '123456789',
          image: 'https://placekitten.com/200/300',
        }}
        userId="123456789"
      />,
      {
        wrapper: QueryClientWrapper,
      }
    )

    expect(view).toMatchSnapshot()
  })
})
