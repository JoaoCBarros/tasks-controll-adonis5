import StoreTaskInput from 'App/modules/Task/dto/StoreTaskInput'
import UpdateTaskInput from 'App/modules/Task/dto/UpdateTaskInput'
import UpdateTaskStatusInput from 'App/modules/Task/dto/UpdateTaskStatusInput'
import TaskEntity from 'App/modules/Task/Entity/TaskEntity'
import TaskRepository from 'App/Repositories/TaskRepository'

export default class TaskRepositoryMemoryImpl implements TaskRepository {
  private tasks: TaskEntity[] = []

  public async storeTask(input: StoreTaskInput): Promise<TaskEntity> {
    const newTaskId = this.tasks.length + 1
    const task = {
      ...input,
      id: newTaskId,
    }

    this.tasks.push(task)

    return this.getTaskById(newTaskId)
  }
  public async getTaskById(taskId: number): Promise<TaskEntity> {
    const tasksFilteredById = this.tasks.filter((task) => {
      return task.id === taskId
    })

    this.haveAnyTask(tasksFilteredById)

    return tasksFilteredById[0]
  }

  private haveAnyTask(tasks: TaskEntity[]) {
    if (tasks.length === 0) {
      throw new Error('TASK_NOT_FOUND')
    }
  }

  public async deleteTaskById(taskId: number): Promise<void> {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== taskId
    })
  }
  public async updateTaskById(input: UpdateTaskInput): Promise<void> {
    this.tasks = this.tasks.reduce((acc, cur) => {
      if (cur.id === input.id) {
        cur = { ...cur, ...input }
      }
      return [...acc, cur]
    }, [])
  }
  public async updateTaskStatusById(input: UpdateTaskStatusInput): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
