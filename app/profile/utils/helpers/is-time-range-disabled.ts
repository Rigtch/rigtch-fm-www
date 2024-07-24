import { BETA_USER_CREATED_AT } from '@app/profile/constants'
import { RigtchTimeRange, SpotifyTimeRange } from '@app/profile/enums'
import { afterParamFactory } from '@app/profile/utils/factories'

export function isTimeRangeDisabled(
  value: RigtchTimeRange | SpotifyTimeRange,
  userCreatedAt?: Date,
  ignoreBetaUser?: boolean
) {
  if (Object.values(SpotifyTimeRange).includes(value)) return false

  if (!userCreatedAt) return false

  const isBetaUser =
    userCreatedAt.getTime() < BETA_USER_CREATED_AT.getTime() && !ignoreBetaUser

  return (
    Object.values(RigtchTimeRange).includes(value) &&
    !isBetaUser &&
    userCreatedAt.getTime() >
      afterParamFactory(value as RigtchTimeRange).getTime()
  )
}
