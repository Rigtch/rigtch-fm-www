import { isEntity } from './is-entity'

describe('isEntity', () => {
  it('should return true if value has externalId', () => {
    const value = { externalId: '123' }
    expect(isEntity(value)).toBe(true)
  })

  it('should return false if value does not have externalId', () => {
    const value = { id: '123' }
    expect(isEntity(value)).toBe(false)
  })
})
