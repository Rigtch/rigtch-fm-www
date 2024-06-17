import { render } from '@testing-library/react'

import { FollowersCount } from './followers-count'

describe('FollowersCount', () => {
  test('should match snapshot', () => {
    const view = render(<FollowersCount value={4200} />)

    expect(view).toMatchSnapshot()
  })
})
