import StoreTaskInput from 'App/modules/Task/dto/StoreTaskInput'
import UpdateTaskInput from 'App/modules/Task/dto/UpdateTaskInput'
import UpdateTaskStatusInput from 'App/modules/Task/dto/UpdateTaskStatusInput'
import TaskEntity from 'App/modules/Task/Entity/TaskEntity'
import TaskRepository from 'App/Repositories/TaskRepository'
import { DateTime } from 'luxon'

export default class TaskRepositoryMemoryImpl implements TaskRepository {
  private tasks: TaskEntity[] = []

  public async storeTask(input: StoreTaskInput): Promise<TaskEntity> {
    const newTaskId = this.tasks.length + 1
    const task = {
      ...input,
      id: newTaskId,
    }

    this.tasks.push(task)

    return this.tasks.filter((task) => {
      return task.id === newTaskId
    })[0]
  }
  public async getTaskById(taskId: number): Promise<TaskEntity> {
    throw new Error('Method not implemented.')
  }
  public async deleteTaskById(taskId: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public async updateTaskById(input: UpdateTaskInput): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public async updateTaskStatusById(input: UpdateTaskStatusInput): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
