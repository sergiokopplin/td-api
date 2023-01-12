import { Todo } from '@/domain/models'

export interface AddTodoRepository {
  add: (todo: AddTodoRepository.Params) => Promise<AddTodoRepository.Result>
}

type AddTodoRepositoryParams = Pick<Todo, 'text' | 'currentDate' | 'workspacesId'>

export namespace AddTodoRepository {
  export type Result = Todo
  export type Params = AddTodoRepositoryParams
}
