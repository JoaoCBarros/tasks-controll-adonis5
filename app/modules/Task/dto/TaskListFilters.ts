import FilterListInput from 'App/Dto/FilterListInput'
import { TaskStatus } from '../Entity/TaskEntity'

export default interface TaskListFilters extends FilterListInput {
  status?: TaskStatus
}
