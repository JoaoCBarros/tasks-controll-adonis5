import CreateUserInput from 'App/modules/User/dto/CreateUserInput'
import UserEntity from 'App/modules/User/Entity/UserEntity'
import UserRepository from 'App/Repositories/UserRepository'

export default class UserRepositoryMemoryImpl implements UserRepository {
  private users: UserEntity[] = []

  public async getUserById(userId: number): Promise<UserEntity> {
    const usersFilteredById = this.users.filter((user) => {
      return user.id === userId
    })

    this.haveAnyUser(usersFilteredById)

    return usersFilteredById[0]
  }
  public async createUser(input: CreateUserInput): Promise<UserEntity> {
    const newUserId = this.users.length + 1

    this.users.push({
      ...input,
      id: newUserId,
    })

    return await this.getUserById(newUserId)
  }

  private haveAnyUser(users: UserEntity[]) {
    if (users.length === 0) {
      throw new Error('USER_NOT_FOUND')
    }
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    throw new Error(`Method not implemented. ${email}`)
  }
}
