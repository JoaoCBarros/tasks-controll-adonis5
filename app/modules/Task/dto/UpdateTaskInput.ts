export default interface UpdateTaskInput {
  id: number
  title?: string
  description?: string
  createdAt?: Date
  expiresAt?: Date
}
