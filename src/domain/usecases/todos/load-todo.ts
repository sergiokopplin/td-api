import { Todo } from '@/domain/models'

export interface LoadTodo {
  load: (todo: LoadTodo.Params) => Promise<LoadTodo.Result>
}

type LoadTodoParams = Pick<Todo, 'id' | 'workspacesId'>

export namespace LoadTodo {
  export type Params = LoadTodoParams
  export type Result = Todo
}
