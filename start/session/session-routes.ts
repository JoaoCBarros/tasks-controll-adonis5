import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'SessionsController.createSession').namespace('App/Infra/Http/Session')
Route.post('loggout', 'SessionsController.destroySession')
  .namespace('App/Infra/Http/Session')
  .middleware(['auth'])
