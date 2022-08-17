import TaskEntity from '../Entity/TaskEntity'
export default interface ShowTaskOutput extends TaskEntity {
  id: number
  user: UserTaskOutput
}

interface UserTaskOutput {
  id: number
  name: string
}
