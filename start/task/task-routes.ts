import Route from '@ioc:Adonis/Core/Route'

Route.post('task', 'TasksController.store').namespace('App/Infra/Http/Task')
