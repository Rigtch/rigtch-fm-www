export function isEntity<T extends object>(value: T) {
  return 'externalId' in value
}
