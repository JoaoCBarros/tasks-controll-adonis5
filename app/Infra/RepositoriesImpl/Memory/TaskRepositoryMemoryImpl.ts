import StoreTaskInput from 'App/modules/Task/dto/StoreTaskInput'
import TaskListFilters from 'App/modules/Task/dto/TaskListFilters'
import TaskListOutput from 'App/modules/Task/dto/TaskListOutput'
import UpdateTaskInput from 'App/modules/Task/dto/UpdateTaskInput'
import TaskEntity from 'App/modules/Task/Entity/TaskEntity'
import TaskRepository from 'App/Repositories/TaskRepository'

export default class TaskRepositoryMemoryImpl implements TaskRepository {
  private tasks: TaskEntity[] = []

  public async getAllTasks(_taskListFilter: TaskListFilters): Promise<TaskListOutput> {
    return {
      meta: {},
      data: this.tasks,
    }
  }

  public async storeTask(input: StoreTaskInput): Promise<TaskEntity> {
    const newTaskId = this.tasks.length + 1
    const task: TaskEntity = {
      ...input,
      id: newTaskId,
      user: {
        id: 1,
        name: 'UserTest',
        email: 'usertest@gmail.com',
        password: '1234',
      },
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
}
