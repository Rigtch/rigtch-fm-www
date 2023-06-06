import { describe, test } from 'vitest'

import { isMobile } from './is-mobile'

describe('isMobile', () => {
  test('should return false if window is undefined', () => {
    expect(isMobile()).toEqual(false)
  })

  test('should return false if window.innerWidth is greater than 768', () => {
    window.innerWidth = 800

    expect(isMobile()).toEqual(false)
  })

  test('should return true if window.innerWidth is less than 768', () => {
    window.innerWidth = 700

    expect(isMobile()).toEqual(true)
  })
})
