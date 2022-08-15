export default interface TaskEntity {
  id: number
  title: string
  description: string
  user_id: number
  status: TaskStatus
  createdAt: Date
  expiresAt: Date
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
