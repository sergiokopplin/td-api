import { SearchQ, Todo } from '@/domain/models'

export interface SearchTodos {
  search: (params: SearchTodos.Params) => Promise<SearchTodos.Result>
}

interface SearchTodosParams {
  q: SearchQ
}

export namespace SearchTodos {
  export type Params = SearchTodosParams
  export type Result = Todo[]
}
