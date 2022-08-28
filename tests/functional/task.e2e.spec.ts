import { test } from '@japa/runner'
import CreateSessionInput from 'App/modules/Session/dto/CreateSessionInput'
import StoreTaskInput from 'App/modules/Task/dto/StoreTaskInput'
import { TaskStatus } from 'App/modules/Task/Entity/TaskEntity'
import { DateTime } from 'luxon'

test.group('TaskService Testing', (group) => {
  let bearerToken: string
  group.each.setup(async (test) => {
    const { client } = test.context
    const userLogin: CreateSessionInput = {
      email: 'jpedro.profissional@gmail.com',
      password: 'senha123456',
    }
    const { response } = await client.post('/login').json(userLogin)
    bearerToken = response.body.token
  })
  test('It should create a task', async ({ client }) => {
    const task: StoreTaskInput = {
      title: 'My task',
      description: 'My description',
      status: TaskStatus.TODO,
      userId: 1,
      expiresAt: DateTime.now(),
    }
    const response = await client
      .post('/task')
      .json(task)
      .header('Authorization', `Bearer ${bearerToken}`)

    response.assertStatus(200)
    response.assertBodyContains({
      title: 'My task',
      description: 'My description',
      status: TaskStatus.TODO,
    })
  })
})
