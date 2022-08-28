import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TaskRepositoryImpl from 'App/Infra/RepositoriesImpl/Postgres/TaskRepositoryImpl'
import UserRepositoryImpl from 'App/Infra/RepositoriesImpl/Postgres/UserRepositoryImpl'
import TaskService from 'App/modules/Task/TaskService'
import TaskRepository from 'App/Repositories/TaskRepository'
import UserRepository from 'App/Repositories/UserRepository'
import CreateTaskValidator from 'App/Validators/Task/CreateTaskValidator'

export default class TasksController {
  private readonly taskRepository: TaskRepository
  private readonly userRepository: UserRepository
  private readonly taskService: TaskService
  constructor() {
    this.taskRepository = new TaskRepositoryImpl()
    this.userRepository = new UserRepositoryImpl()
    this.taskService = new TaskService(this.taskRepository, this.userRepository)
  }
  public async store({ request, auth, response }: HttpContextContract) {
    const taskDataInput = await request.validate(CreateTaskValidator)

    if (!auth.user || !auth.user.id) {
      return response.badRequest({
        message: 'User Not Found',
      })
    }

    return await this.taskService.store({
      ...taskDataInput,
      userId: auth.user.id,
    })
  }
}
