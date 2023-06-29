import UserEntity from 'App/modules/User/Entity/UserEntity'
import { DateTime } from 'luxon'

export default interface TaskEntity {
  id: number
  title?: string
  description?: string
  userId: number
  status?: TaskStatus
  createdAt?: DateTime
  expiresAt?: DateTime
  user: UserEntity
}

export enum TaskStatus {
  HIGH_PRIORITY = 'HIGH_PRIORITY',
  MIDDLE_PRIORITY = 'HIGH_PRIORITY',
  LOW_PRIORITY = 'HIGH_PRIORITY',
}
