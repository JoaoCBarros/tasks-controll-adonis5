import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TaskRepositoryMemoryImpl from 'App/Infra/RepositoriesImpl/Memory/TaskRepositoryMemoryImpl'
import UserRepositoryMemoryImpl from 'App/Infra/RepositoriesImpl/Memory/UserRepositoryMemoryImpl'
import TaskService from 'App/modules/Task/TaskService'
import TaskRepository from 'App/Repositories/TaskRepository'
import UserRepository from 'App/Repositories/UserRepository'
import CreateTaskValidator from 'App/Validators/Task/CreateTaskValidator'

export default class TasksController {
  private readonly taskRepository: TaskRepository
  private readonly userRepository: UserRepository
  private readonly taskService: TaskService
  constructor() {
    this.taskRepository = new TaskRepositoryMemoryImpl()
    this.userRepository = new UserRepositoryMemoryImpl()
    this.taskService = new TaskService(this.taskRepository, this.userRepository)
  }
  public async store({ request }: HttpContextContract) {
    this.userRepository.createUser({
      name: 'João',
      email: 'joao@gmail.com',
      password: '123@123',
    })

    const taskDataInput = await request.validate(CreateTaskValidator)

    //@TODO - Implements Auth Layer
    const userId = 1

    return await this.taskService.store({ ...taskDataInput, userId })
  }
}
