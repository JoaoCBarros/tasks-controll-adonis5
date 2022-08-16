import CreateUserInput from 'App/modules/User/dto/CreateUserInput'
import UserEntity from 'App/modules/User/Entity/UserEntity'

export default interface UserRepository {
  getUserById(userId: number): Promise<UserEntity>
  createUser(input: CreateUserInput): Promise<UserEntity>
  getUserByEmail(email: string): Promise<UserEntity>
}
