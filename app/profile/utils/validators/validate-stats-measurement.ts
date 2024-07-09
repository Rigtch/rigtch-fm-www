import { StatsMeasurement } from '@app/api/types'

function isStatsMeasurement(value: string): value is StatsMeasurement {
  return Object.values(StatsMeasurement).includes(value as StatsMeasurement)
}

export function validateStatsMeasurement(
  statsMeasurement?: string | string[] | null
) {
  if (
    typeof statsMeasurement === 'string' &&
    isStatsMeasurement(statsMeasurement)
  )
    return statsMeasurement

  return StatsMeasurement.PLAYS
}
