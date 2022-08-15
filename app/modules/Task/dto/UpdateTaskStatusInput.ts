import { TaskStatus } from '../Entity/TaskEntity'

export default interface UpdateTaskStatusInput {
  id: number
  status: TaskStatus
}
