import { describe, test } from 'vitest'

import { getImage } from './get-image'

import { Image } from '~/graphql/types'

const imagesMock: Image[] = [{ url: 'https://url1' }, { url: 'https://url2' }]

describe('Utils - getImage', () => {
  test('returns empty string if album is undefined', () => {
    expect(getImage()).toEqual('')
  })

  test('returns empty string if album images is empty', () => {
    expect(getImage([])).toEqual('')
  })

  test('should return string with album image url at default index 0', () => {
    expect(getImage(imagesMock)).toEqual('https://url1')
  })

  test('should return string with album image url at index 1', () => {
    expect(getImage(imagesMock, 1)).toEqual('https://url2')
  })
})
