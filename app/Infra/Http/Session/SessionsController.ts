import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SessionService from 'App/modules/Session/SessionService'
import CreateSessionValidator from 'App/Validators/Session/CreateSessionValidator'

export default class SessionsController {
  constructor(private readonly sessionService: SessionService = new SessionService()) {}
  public async createSession({ request, response, auth }: HttpContextContract) {
    const input = await request.validate(CreateSessionValidator)
    try {
      return response.send(await this.sessionService.createSession(input, auth))
    } catch (error) {
      return response.unauthorized('Invalid Credentials')
    }
  }

  public async destroySession({ response, auth }: HttpContextContract) {
    try {
      return response.send(await this.sessionService.destroySession(auth))
    } catch (error) {
      return response.badGateway('Server Error')
    }
  }
}
