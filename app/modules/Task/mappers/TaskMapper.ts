import { DateTime } from 'luxon'
import TaskEntity, { TaskStatus } from '../Entity/TaskEntity'

export default class TaskMapper {
  public formatTasksToOutput(tasks: TaskEntity[]): TaskEntity[] {
    return tasks.reduce((acc, cur) => {
      cur = this.formatTaskToOutput(cur)
      return [...acc, cur]
    }, [])
  }
  public formatTaskToOutput(task: TaskEntity): TaskEntity {
    const taskStatus = this.calculeStatus(task.expiresAt as DateTime)
    const expiresAtToUTC0 = task.expiresAt?.setZone('UTC-0')

    return {
      ...task,
      status: taskStatus,
      expiresAt: expiresAtToUTC0,
    }
  }

  private calculeStatus(expiresAt: DateTime) {
    const dateNowDiffExpiresAt = expiresAt.diffNow(['days'])
    if (dateNowDiffExpiresAt.days >= 4) {
      return TaskStatus.LOW_PRIORITY
    }

    if (dateNowDiffExpiresAt.days >= 2) {
      return TaskStatus.MIDDLE_PRIORITY
    }

    return TaskStatus.HIGH_PRIORITY
  }
}
