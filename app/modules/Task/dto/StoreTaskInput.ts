import { DateTime } from 'luxon'

export default interface StoreTaskInput {
  title: string
  description: string
  userId: number
  createdAt?: DateTime
  expiresAt?: DateTime
}
