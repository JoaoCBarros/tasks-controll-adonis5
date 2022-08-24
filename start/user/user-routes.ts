import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.post('user', 'UsersController.store')
})
  .namespace('App/Infra/Http/User')
  .middleware(['auth'])
