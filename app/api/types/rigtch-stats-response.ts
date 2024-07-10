import type { StatsMeasurement } from '../enums'

import type { AlbumEntity, ArtistEntity, TrackEntity } from '@app/api/types'

export type RigtchStatsResponse<
  TItem extends string | TrackEntity | ArtistEntity | AlbumEntity,
  TMeasurement extends StatsMeasurement = StatsMeasurement,
> = ({
  item: TItem
} & (TMeasurement extends StatsMeasurement.PLAYS
  ? {
      plays: number
      playTime?: never
    }
  : {
      playTime: number
      plays?: never
    }))[]
