import TaskRepository from 'App/Repositories/TaskRepository'
import UserRepository from 'App/Repositories/UserRepository'
import { DateTime } from 'luxon'
import TaskListFilters from './dto/TaskListFilters'
import ShowTaskOutput from './dto/ShowTaskOutput'
import StoreTaskInput from './dto/StoreTaskInput'
import TaskListOutput from './dto/TaskListOutput'
import UpdateTaskInput from './dto/UpdateTaskInput'
import TaskEntity from './Entity/TaskEntity'
import TaskMapper from './mappers/TaskMapper'

export default class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository,
    private taskMapper = new TaskMapper()
  ) {}

  public async store(input: StoreTaskInput): Promise<ShowTaskOutput> {
    const createdAt = DateTime.now()
    const task = await this.taskRepository.storeTask({ ...input, createdAt })

    if (!task.id) {
      throw new Error('SAVE_TASK_ERROR')
    }

    const user = await this.userRepository.getUserById(task.userId)
    return { ...task, user }
  }

  public async update(input: UpdateTaskInput) {
    await this.taskRepository.updateTaskById(input)
  }

  public async delete(taskId: number) {
    await this.taskRepository.deleteTaskById(taskId)
  }

  public async show(taskId: number): Promise<ShowTaskOutput> {
    const task = await this.getTaskFormatted(taskId)

    return task
  }

  private async getTaskFormatted(taskId: number): Promise<TaskEntity> {
    const task = await this.taskRepository.getTaskById(taskId)
    const taskOutputMapper = this.taskMapper.formatTaskToOutput(task)

    return taskOutputMapper
  }

  public async list(taskListFilter: TaskListFilters): Promise<TaskListOutput> {
    const tasks = await this.taskRepository.getAllTasks(taskListFilter)
    const tasksOutputMapper = this.taskMapper.formatTasksToOutput(tasks.data)

    return { ...tasks, data: tasksOutputMapper }
  }
}
