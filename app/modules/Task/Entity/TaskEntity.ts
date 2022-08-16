import { DateTime } from 'luxon'

export default interface TaskEntity {
  id?: number
  title?: string
  description?: string
  user_id: number
  status?: TaskStatus
  createdAt?: DateTime
  expiresAt?: DateTime
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
