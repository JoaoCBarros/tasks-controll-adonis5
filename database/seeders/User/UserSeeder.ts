import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Infra/Models/User'
import UserEntity from 'App/modules/User/Entity/UserEntity'

export default class extends BaseSeeder {
  public async run() {
    const users: UserEntity[] = [
      {
        id: 1,
        name: 'João',
        email: 'jpedro.profissional@gmail.com',
        password: 'senha123456',
      },
    ]

    await User.updateOrCreateMany('id', users)
  }
}
