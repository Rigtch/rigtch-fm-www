import type { StatsMeasurement } from '@app/api/enums'
import type {
  AlbumEntity,
  ArtistEntity,
  RigtchStatsResponse,
  TrackEntity,
} from '@app/api/types'

export function formatItems(
  items:
    | ArtistEntity[]
    | TrackEntity[]
    | RigtchStatsResponse<ArtistEntity | TrackEntity | AlbumEntity>
) {
  return items.map((item, index) => ({
    ...('item' in item
      ? 'plays' in item
        ? {
            ...item.item,
            plays: item.plays,
            maxPlays: Math.max(
              ...(
                items as RigtchStatsResponse<
                  ArtistEntity | TrackEntity | AlbumEntity,
                  StatsMeasurement.PLAYS
                >
              ).map(item => item.plays)
            ),
          }
        : {
            ...item.item,
            playTime: item.playTime,
            maxPlayTime: Math.max(
              ...(
                items as RigtchStatsResponse<
                  ArtistEntity | TrackEntity | AlbumEntity,
                  StatsMeasurement.PLAY_TIME
                >
              ).map(item => item.playTime)
            ),
          }
      : item),
    ...(!('playedAt' in items[0]) && {
      position: index + 1,
    }),
  }))
}
