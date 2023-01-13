import { Todo } from '@/domain/models'

export interface AddTodo {
  add: (todo: AddTodo.Params) => Promise<AddTodo.Result>
}

type AddTodoParams = Pick<Todo, 'text' | 'currentDate' | 'workspacesId'>

export namespace AddTodo {
  export interface Result { todo: Todo }
  export type Params = AddTodoParams
}
