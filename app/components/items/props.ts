export type PlaytimeOrPlaysProps =
  | {
      playtime: number
      maxPlaytime: number
      plays?: never
      maxPlays?: never
    }
  | {
      playtime?: never
      maxPlaytime?: never
      plays: number
      maxPlays: number
    }
  | {
      playtime?: never
      maxPlaytime?: never
      plays?: never
      maxPlays?: never
    }
