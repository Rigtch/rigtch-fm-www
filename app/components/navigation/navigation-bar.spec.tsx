import { render } from '@testing-library/react'
import type { HTMLAttributes } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { NavigationBar } from './navigation-bar'

function Wrapper({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  )
}

describe('NavigationBar', () => {
  test('should match snapshot as unauthenticated', () => {
    const view = render(<NavigationBar />, {
      wrapper: Wrapper,
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
        wrapper: Wrapper,
      }
    )

    expect(view).toMatchSnapshot()
  })
})
