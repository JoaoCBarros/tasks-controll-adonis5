import { GuardsList } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'

/**
 * Auth middleware is meant to restrict un-authenticated access to a given route
 * or a group of routes.
 *
 * You must register this middleware inside `start/kernel.ts` file under the list
 * of named middleware.
 */
export default class AuthMiddleware {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (!(await auth.check())) return response.status(401).send('Usuário não autenticado')
    await next()
  }
}
