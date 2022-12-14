import TaskRepository from 'App/Repositories/TaskRepository'
import UserRepository from 'App/Repositories/UserRepository'
import { DateTime } from 'luxon'
import ShowTaskOutput from './dto/ShowTaskOutput'
import StoreTaskInput from './dto/StoreTaskInput'
import UpdateTaskInput from './dto/UpdateTaskInput'
import UpdateTaskStatusInput from './dto/UpdateTaskStatusInput'

export default class TaskService {
  constructor(private taskRepository: TaskRepository, private userRepository: UserRepository) {}

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
    const task = await this.taskRepository.getTaskById(taskId)
    const user = await this.userRepository.getUserById(task.userId)
    return { ...task, user }
  }

  public async updateStatus(input: UpdateTaskStatusInput) {
    await this.taskRepository.updateTaskStatusById(input)
  }
}
