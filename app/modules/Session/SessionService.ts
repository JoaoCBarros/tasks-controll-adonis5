import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Env from '@ioc:Adonis/Core/Env'
import CreateSessionInput from './dto/CreateSessionInput'

export default class SessionService {
  public async createSession(input: CreateSessionInput, auth: AuthContract) {
    const token = await auth.use('api').attempt(input.email, input.password, {
      expiresIn: Env.get('SESSION_EXPIRES', '8hours'),
    })
    return token
  }
  public async destroySession(auth: AuthContract) {
    await auth.use('api').revoke()
  }
}
