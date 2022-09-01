import StoreTaskInput from 'App/modules/Task/dto/StoreTaskInput'
import TaskListFilters from 'App/modules/Task/dto/TaskListFilters'
import TaskListOutput from 'App/modules/Task/dto/TaskListOutput'
import UpdateTaskInput from 'App/modules/Task/dto/UpdateTaskInput'
import TaskEntity from 'App/modules/Task/Entity/TaskEntity'

export default interface TaskRepository {
  storeTask(input: StoreTaskInput): Promise<TaskEntity>
  getTaskById(taskId: number): Promise<TaskEntity>
  deleteTaskById(taskId: number): Promise<void>
  updateTaskById(input: UpdateTaskInput): Promise<void>
  getAllTasks(taskListFilter: TaskListFilters): Promise<TaskListOutput>
}
