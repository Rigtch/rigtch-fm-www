export interface Pagination<T> {
  data: T[]
  meta: {
    totalItems: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}
