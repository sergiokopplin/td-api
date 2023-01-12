import { Todo } from '@/domain/models'

export interface DeleteTodo {
  delete: (todo: DeleteTodo.Params) => Promise<void>
}

type DeleteTodoParams = Pick<Todo, 'id' | 'workspacesId'>

export namespace DeleteTodo {
  export type Params = DeleteTodoParams
}
