import Route from '@ioc:Adonis/Core/Route'

Route.post('user', 'UsersController.store').namespace('App/Infra/Http/User')
