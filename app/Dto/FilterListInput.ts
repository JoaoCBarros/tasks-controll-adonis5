export default interface FilterListInput {
  search?: string
  orderField?: string
  order?: 'ASC' | 'DESC'
  page?: number
  perPage?: number
}
