import { test } from '@japa/runner'
import TaskRepositoryMemoryImpl from 'App/Infra/RepositoriesImpl/Memory/TaskRepositoryMemoryImpl'
import { DateTime } from 'luxon'
import { TaskStatus } from 'App/modules/Task/Entity/TaskEntity'
import TaskService from './TaskService'
import UserRepositoryMemoryImpl from 'App/Infra/RepositoriesImpl/Memory/UserRepositoryMemoryImpl'

test.group('TaskService Testing', (group) => {
  let taskService: TaskService
  group.each.setup(() => {
    const taskRepositoryMemoryImpl = new TaskRepositoryMemoryImpl()
    const userRepositoryMemoryImpl = new UserRepositoryMemoryImpl()
    userRepositoryMemoryImpl.createUser({
      name: 'João',
      email: 'joao@gmail.com',
      password: '123456',
    })
    taskService = new TaskService(taskRepositoryMemoryImpl, userRepositoryMemoryImpl)
  })

  test('should store a one task', async ({ assert }) => {
    const newTask = {
      title: 'Any Task',
      description: 'Any My Task',
      status: 'TODO' as TaskStatus,
      user_id: 1,
      expiresAt: DateTime.now(),
    }

    const addedTask = await taskService.store(newTask)
    assert.equal(addedTask.title, newTask.title)
    assert.equal(addedTask.description, newTask.description)
    assert.equal(addedTask.user_id, newTask.user_id)
  })

  test('should delete one task', async ({ assert }) => {
    const newTask = {
      title: 'Any Task',
      description: 'Any My Task',
      status: 'TODO' as TaskStatus,
      user_id: 1,
      expiresAt: DateTime.now(),
    }

    const { id } = await taskService.store(newTask)

    id && (await taskService.delete(id))

    id &&
      (await assert.rejects(async () => {
        await taskService.show(id)
      }, 'TASK_NOT_FOUND'))
  })
})
