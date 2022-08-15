import StoreTaskInput from 'App/modules/Task/dto/StoreTaskInput'
import UpdateTaskInput from 'App/modules/Task/dto/UpdateTaskInput'
import UpdateTaskStatusInput from 'App/modules/Task/dto/UpdateTaskStatusInput'
import TaskEntity from 'App/modules/Task/Entity/TaskEntity'

export default interface TaskRepository {
  storeTask(input: StoreTaskInput): Promise<TaskEntity>
  getTaskById(taskId: number): Promise<TaskEntity>
  deleteTaskById(taskId: number): Promise<void>
  updateTaskById(input: UpdateTaskInput): Promise<void>
  updateTaskStatusById(input: UpdateTaskStatusInput): Promise<void>
}
