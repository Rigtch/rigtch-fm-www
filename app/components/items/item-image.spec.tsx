import { render } from '@testing-library/react'

import { ItemImage } from './item-image'

describe('ItemImage', () => {
  const images = [
    {
      height: 64,
      width: 64,
      url: 'https://i.scdn.co/image/ab67616d000048515fdcfafcc8e7831c5fe2c618',
    },
    {
      height: 300,
      width: 300,
      url: 'https://i.scdn.co/image/ab67616d00001e025fdcfafcc8e7831c5fe2c618',
    },
    {
      height: 640,
      width: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b2735fdcfafcc8e7831c5fe2c618',
    },
  ]

  test('should match snapshot with size 64', () => {
    const view = render(<ItemImage images={images} size={64} alt="" />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with size 300', () => {
    const view = render(<ItemImage images={images} size={300} alt="" />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with size 640', () => {
    const view = render(<ItemImage images={images} size={640} alt="" />)

    expect(view).toMatchSnapshot()
  })
})
