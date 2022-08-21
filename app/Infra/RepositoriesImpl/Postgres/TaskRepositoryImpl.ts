import Task from 'App/Infra/Models/Task'
import StoreTaskInput from 'App/modules/Task/dto/StoreTaskInput'
import UpdateTaskInput from 'App/modules/Task/dto/UpdateTaskInput'
import UpdateTaskStatusInput from 'App/modules/Task/dto/UpdateTaskStatusInput'
import TaskEntity from 'App/modules/Task/Entity/TaskEntity'
import TaskRepository from 'App/Repositories/TaskRepository'

export default class TaskRepositoryImpl implements TaskRepository {
  public async storeTask(input: StoreTaskInput): Promise<TaskEntity> {
    const task = await Task.create(input)

    return task
  }
  public async getTaskById(taskId: number): Promise<TaskEntity> {
    const task = await Task.findByOrFail('id', taskId)
    return task
  }
  public async deleteTaskById(taskId: number): Promise<void> {
    const task = await Task.findByOrFail('id', taskId)
    await task.delete()
  }
  public async updateTaskById(input: UpdateTaskInput): Promise<void> {
    await Task.updateOrCreate({ id: input.id }, input)
  }
  public async updateTaskStatusById(input: UpdateTaskStatusInput): Promise<void> {
    await Task.updateOrCreate({ id: input.id }, { status: input.status })
  }
}
