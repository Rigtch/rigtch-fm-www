import type { HTMLAttributes } from 'react'

export type GenreProps = Readonly<
  HTMLAttributes<HTMLDivElement> & {
    genre: string
  }
>
