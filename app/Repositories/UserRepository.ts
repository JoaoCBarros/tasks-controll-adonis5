import UserEntity from 'App/modules/User/Entity/UserEntity'

export default interface UserRepository {
  getUserById(userId: number): Promise<UserEntity>
}
