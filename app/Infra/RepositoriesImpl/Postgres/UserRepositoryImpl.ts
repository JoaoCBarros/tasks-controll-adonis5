import User from 'App/Infra/Models/User'
import CreateUserInput from 'App/modules/User/dto/CreateUserInput'
import UserEntity from 'App/modules/User/Entity/UserEntity'
import UserRepository from 'App/Repositories/UserRepository'

export default class UserRepositoryImpl implements UserRepository {
  public async getUserById(userId: number): Promise<UserEntity> {
    const user = await User.findByOrFail('id', userId)
    return user
  }

  public async createUser(input: CreateUserInput): Promise<UserEntity> {
    const user = await User.create(input)
    return user
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await User.findByOrFail('email', email)
    return user
  }
}
