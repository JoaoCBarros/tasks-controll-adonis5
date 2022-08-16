import { DateTime } from 'luxon'
import { TaskStatus } from '../Entity/TaskEntity'

export default interface StoreTaskInput {
  title: string
  description: string
  user_id: number
  status: TaskStatus
  createdAt?: DateTime
  expiresAt?: DateTime
}
