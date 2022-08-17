import { DateTime } from 'luxon'

export default interface UpdateTaskInput {
  id: number
  title?: string
  description?: string
  expiresAt?: DateTime
}
