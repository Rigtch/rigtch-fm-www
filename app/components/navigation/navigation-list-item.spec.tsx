import { NavigationMenu } from '@radix-ui/react-navigation-menu'
import { render } from '@testing-library/react'

import { NavigationListItem } from './navigation-list-item'

describe('NavigationListItem', () => {
  test('should match snapshot', () => {
    const view = render(<NavigationListItem>Item</NavigationListItem>, {
      wrapper: NavigationMenu,
    })

    expect(view).toMatchSnapshot()
  })
})
