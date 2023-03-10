import { type SearchQ, type Todo, type TodoWorkspacesId } from '@/domain/models'

export interface SearchTodos {
  search: (params: SearchTodos.Params) => Promise<SearchTodos.Result>
}

interface SearchTodosParams {
  q: SearchQ
  workspacesId: TodoWorkspacesId
}

export namespace SearchTodos {
  export type Params = SearchTodosParams
  export interface Result { todos: Todo[] }
}
