import { type Todo } from '@/domain/models'

export interface LoadTodoRepository {
  load: (todo: LoadTodoRepository.Params) => Promise<LoadTodoRepository.Result>
}

type LoadTodoRepositoryParam = Pick<Todo, 'id' | 'workspacesId'>

export namespace LoadTodoRepository {
  export type Result = Todo
  export type Params = LoadTodoRepositoryParam
}
