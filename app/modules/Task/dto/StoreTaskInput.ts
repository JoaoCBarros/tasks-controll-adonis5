import { DateTime } from 'luxon'
import { TaskStatus } from '../Entity/TaskEntity'

export default interface StoreTaskInput {
  title: string
  description: string
  userId: number
  status: TaskStatus
  createdAt?: DateTime
  expiresAt?: DateTime
}
