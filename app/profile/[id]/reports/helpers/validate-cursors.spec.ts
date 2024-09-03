import { validateCursors } from './validate-cursors'

describe('validateCursors', () => {
  test('should return default cursors', () => {
    const { before, after } = validateCursors()

    expect(before.getFullYear()).toBe(new Date().getFullYear())
    expect(before.getMonth()).toBe(new Date().getMonth())
    expect(before.getDate()).toEqual(expect.any(Number))
    expect(after.getFullYear()).toBe(new Date().getFullYear())
    expect(after.getMonth()).toBe(new Date().getMonth() - 1)
    expect(after.getDate()).toEqual(expect.any(Number))
  })

  test('should return custom cursors', () => {
    const { before, after } = validateCursors(
      '2022-01-01T00:00:00.000Z',
      '2022-01-02T00:00:00.000Z'
    )

    expect(before.getFullYear()).toBe(2022)
    expect(before.getMonth()).toBe(0)
    expect(before.getDate()).toBe(1)
    expect(after.getFullYear()).toBe(2022)
    expect(after.getMonth()).toBe(0)
    expect(after.getDate()).toBe(2)
  })
})
