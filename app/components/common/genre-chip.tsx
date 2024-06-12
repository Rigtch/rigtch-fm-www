export interface GenreChipProps {
  genre: string
}

export function GenreChip({ genre }: GenreChipProps) {
  return (
    <div className="w-max p-2 rounded-xl whitespace-nowrap bg-neutral-700 text-white">
      {genre}
    </div>
  )
}
