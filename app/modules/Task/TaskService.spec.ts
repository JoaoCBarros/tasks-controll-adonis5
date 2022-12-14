import { test } from '@japa/runner'
import TaskRepositoryMemoryImpl from 'App/Infra/RepositoriesImpl/Memory/TaskRepositoryMemoryImpl'
import { DateTime } from 'luxon'
import { TaskStatus } from 'App/modules/Task/Entity/TaskEntity'
import TaskService from './TaskService'
import UserRepositoryMemoryImpl from 'App/Infra/RepositoriesImpl/Memory/UserRepositoryMemoryImpl'

test.group('TaskService Testing', (group) => {
  let taskService: TaskService
  let taskCreatedId: number
  group.each.setup(async () => {
    const taskRepositoryMemoryImpl = new TaskRepositoryMemoryImpl()
    const userRepositoryMemoryImpl = new UserRepositoryMemoryImpl()
    await userRepositoryMemoryImpl.createUser({
      name: 'João',
      email: 'joao@gmail.com',
      password: '123456',
    })
    const newTask = {
      title: 'Any Task',
      description: 'Any My Task',
      status: TaskStatus.TODO,
      userId: 1,
      expiresAt: DateTime.now(),
    }

    taskService = new TaskService(taskRepositoryMemoryImpl, userRepositoryMemoryImpl)
    taskCreatedId = (await taskService.store(newTask)).id
  })

  test('should store a one task', async ({ assert }) => {
    const newTask = {
      title: 'Any Task',
      description: 'Any My Task',
      status: TaskStatus.TODO,
      userId: 1,
      expiresAt: DateTime.now(),
    }

    const addedTask = await taskService.store(newTask)
    assert.equal(addedTask.title, newTask.title)
    assert.equal(addedTask.description, newTask.description)
    assert.equal(addedTask.userId, newTask.userId)
  })

  test('should delete one task', async ({ assert }) => {
    await taskService.delete(taskCreatedId)
    await assert.rejects(async () => {
      await taskService.show(taskCreatedId)
    }, 'TASK_NOT_FOUND')
  })

  test('should update one task', async ({ assert }) => {
    const newDataToTaskUpdate = {
      id: taskCreatedId,
      title: 'Any Task Updated',
      description: 'Any My Task Updated',
      status: TaskStatus.TODO,
      userId: 1,
    }

    await taskService.update(newDataToTaskUpdate)

    const taskAfterUpdate = await taskService.show(taskCreatedId)

    assert.equal(taskAfterUpdate.title, newDataToTaskUpdate.title)
    assert.equal(taskAfterUpdate.description, newDataToTaskUpdate.description)
    assert.equal(taskAfterUpdate.userId, newDataToTaskUpdate.userId)
  })

  test('should update task status', async ({ assert }) => {
    await taskService.updateStatus({
      id: taskCreatedId,
      status: TaskStatus.IN_PROGRESS,
    })

    const taskAfterUpdateStatus = await taskService.show(taskCreatedId)

    assert.equal(taskAfterUpdateStatus.status, TaskStatus.IN_PROGRESS)
  })
})
