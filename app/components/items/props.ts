export type PlayTimeOrPlays =
  | {
      playTime: number
      maxPlayTime: number
      plays?: never
      maxPlays?: never
    }
  | {
      playTime?: never
      maxPlayTime?: never
      plays: number
      maxPlays: number
    }
  | {
      playTime?: never
      maxPlayTime?: never
      plays?: never
      maxPlays?: never
    }
