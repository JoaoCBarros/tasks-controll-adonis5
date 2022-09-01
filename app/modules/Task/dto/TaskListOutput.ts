import PaginateOutput from 'App/Dto/PaginateOutput'
import TaskEntity from '../Entity/TaskEntity'

export default interface TaskListOutput extends PaginateOutput {
  data: TaskEntity[]
}
