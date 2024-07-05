import type { StatsMeasurement } from './stats-measurement'

import type { AlbumEntity, ArtistEntity, TrackEntity } from '@app/api/types'

export type RigtchStatsResponse<
  TItem extends string | TrackEntity | ArtistEntity | AlbumEntity,
  TMeasurement extends StatsMeasurement,
> = ({
  item: TItem
} & (TMeasurement extends StatsMeasurement.PLAYS
  ? {
      plays: number
    }
  : {
      playtime: number
    }))[]
