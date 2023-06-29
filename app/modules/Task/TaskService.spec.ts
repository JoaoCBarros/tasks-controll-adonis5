import { test } from '@japa/runner'
import TaskRepositoryMemoryImpl from 'App/Infra/RepositoriesImpl/Memory/TaskRepositoryMemoryImpl'
import { DateTime } from 'luxon'
import { TaskStatus } from 'App/modules/Task/Entity/TaskEntity'
import TaskService from './TaskService'
import UserRepositoryMemoryImpl from 'App/Infra/RepositoriesImpl/Memory/UserRepositoryMemoryImpl'
import StoreTaskInput from './dto/StoreTaskInput'

test.group('TaskService Testing', (group) => {
  let taskService: TaskService
  let userDefaultId: number
  group.each.setup(async () => {
    const taskRepositoryMemoryImpl = new TaskRepositoryMemoryImpl()
    const userRepositoryMemoryImpl = new UserRepositoryMemoryImpl()

    userDefaultId = (
      await userRepositoryMemoryImpl.createUser({
        name: 'João',
        email: 'joao@gmail.com',
        password: '123456',
      })
    ).id

    taskService = new TaskService(taskRepositoryMemoryImpl, userRepositoryMemoryImpl)
  })

  test('should store a one task', async ({ assert }) => {
    const newTask = {
      title: 'Any Task',
      description: 'Any My Task',
      userId: 1,
      expiresAt: DateTime.now(),
    }

    const addedTask = await taskService.store(newTask)
    assert.equal(addedTask.title, newTask.title)
    assert.equal(addedTask.description, newTask.description)
    assert.equal(addedTask.userId, newTask.userId)
  })

  test('should delete one task', async ({ assert }) => {
    const newTaskToUpdate = {
      title: 'Any Task',
      description: 'Any My Task',
      userId: 1,
      expiresAt: DateTime.now(),
    }

    const taskCreatedId = (await taskService.store(newTaskToUpdate)).id

    await taskService.delete(taskCreatedId)
    await assert.rejects(async () => {
      await taskService.show(taskCreatedId)
    }, 'TASK_NOT_FOUND')
  })

  test('should update one task', async ({ assert }) => {
    const newTaskToUpdate = {
      title: 'Any Task',
      description: 'Any My Task',
      userId: 1,
      expiresAt: DateTime.now(),
    }

    const taskCreatedId = (await taskService.store(newTaskToUpdate)).id

    const newDataToTaskUpdate = {
      id: taskCreatedId,
      title: 'Any Task Updated',
      description: 'Any My Task Updated',
      userId: 1,
    }

    await taskService.update(newDataToTaskUpdate)

    const taskAfterUpdate = await taskService.show(taskCreatedId)

    assert.equal(taskAfterUpdate.title, newDataToTaskUpdate.title)
    assert.equal(taskAfterUpdate.description, newDataToTaskUpdate.description)
    assert.equal(taskAfterUpdate.userId, newDataToTaskUpdate.userId)
  })

  test('should create a LOW PRIORITY STATUS TASK', async ({ assert }) => {
    const newTaskWithLowPriorityStatus: StoreTaskInput = {
      title: 'My LowPriority task',
      description: 'My LowPriority task description',
      userId: userDefaultId,
      expiresAt: DateTime.now().plus({ days: 4, minutes: 5 }).setZone('UTC-0'),
    }

    const { id } = await taskService.store(newTaskWithLowPriorityStatus)

    const createdTask = await taskService.show(id)

    assert.equal(TaskStatus.LOW_PRIORITY, createdTask.status)
  })

  test('should create a MIDDLE PRIORITY STATUS TASK', async ({ assert }) => {
    const newTaskWithMiddlePriorityStatus: StoreTaskInput = {
      title: 'My MiddlePriority task',
      description: 'My MiddlePriority task description',
      userId: userDefaultId,
      expiresAt: DateTime.now().plus({ days: 3, minutes: 5 }).setZone('UTC-0'),
    }

    const { id } = await taskService.store(newTaskWithMiddlePriorityStatus)

    const createdTask = await taskService.show(id)

    assert.equal(TaskStatus.MIDDLE_PRIORITY, createdTask.status)
  })

  test('should create a HIGH PRIORITY STATUS TASK', async ({ assert }) => {
    const newTaskWithHighPriorityStatus: StoreTaskInput = {
      title: 'My HighPriority task',
      description: 'My HighPriority task description',
      userId: userDefaultId,
      expiresAt: DateTime.now().plus({ days: 1, minutes: 5 }).setZone('UTC-0'),
    }

    const { id } = await taskService.store(newTaskWithHighPriorityStatus)

    const createdTask = await taskService.show(id)

    assert.equal(TaskStatus.HIGH_PRIORITY, createdTask.status)
  })

  test('should get tasks list', async ({ assert }) => {
    const newTasks: StoreTaskInput[] = [
      {
        title: 'My green task',
        description: 'My green task description',
        userId: userDefaultId,
        expiresAt: DateTime.now().plus({ days: 4, minutes: 5 }).setZone('UTC-0'),
      },
      {
        title: 'My green task',
        description: 'My green task description',
        userId: userDefaultId,
        expiresAt: DateTime.now().plus({ days: 4, minutes: 5 }).setZone('UTC-0'),
      },
      {
        title: 'My RED task',
        description: 'My RED task description',
        userId: userDefaultId,
        expiresAt: DateTime.now().plus({ days: 1, minutes: 5 }).setZone('UTC-0'),
      },
    ]

    newTasks.map(async (task) => {
      await taskService.store(task)
    })

    const tasks = await taskService.list({})

    assert.equal(tasks.data.length, 3)
  })
})
