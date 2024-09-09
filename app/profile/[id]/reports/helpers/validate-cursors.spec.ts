import { validateCursors } from './validate-cursors'

describe('validateCursors', () => {
  test('should return default cursors', () => {
    const { before, after } = validateCursors()

    expect(before.getTime() - after.getTime()).toBe(1000 * 60 * 60 * 24 * 7)
  })

  test('should return custom cursors', () => {
    const { before, after } = validateCursors(
      '2022-01-08T00:00:00.000Z',
      '2022-01-01T00:00:00.000Z'
    )

    expect(before.getTime() - after.getTime()).toBe(1000 * 60 * 60 * 24 * 7)
  })
})
