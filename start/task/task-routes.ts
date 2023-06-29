import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('task', 'TasksController.store')
})
  .namespace('App/Infra/Http/Task')
  .middleware(['auth'])
