import { DateTime } from 'luxon'

export default interface TaskEntity {
  id: number
  title?: string
  description?: string
  userId: number
  status?: TaskStatus
  createdAt?: DateTime
  expiresAt?: DateTime
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
