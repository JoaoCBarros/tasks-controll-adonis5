import UserRepository from 'App/Repositories/UserRepository'
import CreateUserInput from './dto/CreateUserInput'
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  public async store(input: CreateUserInput) {
    const user = await this.userRepository.createUser(input)
    return user
  }
}
