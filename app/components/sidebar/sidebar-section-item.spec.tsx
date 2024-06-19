import { render } from '@testing-library/react'
import { LuUser } from 'react-icons/lu'

import { SidebarSectionItem } from './sidebar-section-item'

describe('SidebarSectionItem', () => {
  test('should match snapshot', () => {
    const view = render(<SidebarSectionItem label="Label" href="/" />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with icon', () => {
    const view = render(
      <SidebarSectionItem label="Label" href="/" icon={LuUser} />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as active', () => {
    const view = render(
      <SidebarSectionItem label="Label" href="/" pathname="/" />
    )

    expect(view).toMatchSnapshot()
  })
})
