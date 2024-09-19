export interface ListeningDay {
  dayIndex: number
  value: number
  date: Date
}

export interface GenresListeningDay extends Omit<ListeningDay, 'value'> {
  data: Record<string, number>
}

export type ListeningDays = ListeningDay[]
export type GenresListeningDays = GenresListeningDay[]
