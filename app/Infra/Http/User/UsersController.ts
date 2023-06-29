import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserRepositoryImpl from 'App/Infra/RepositoriesImpl/Postgres/UserRepositoryImpl'
import UserService from 'App/modules/User/UserService'
import UserRepository from 'App/Repositories/UserRepository'
import CreateUserValidator from 'App/Validators/User/CreateUserValidator'

export default class UsersController {
  private readonly userRepository: UserRepository
  private readonly userService: UserService
  constructor() {
    this.userRepository = new UserRepositoryImpl()
    this.userService = new UserService(this.userRepository)
  }
  public async store({ request, response }: HttpContextContract) {
    const input = await request.validate(CreateUserValidator)
    response.send(await this.userService.store(input))
  }
}
