import { SearchQ, Todo, TodoWorkspacesId } from '@/domain/models'

export interface SearchTodosRepository {
  search: (params: SearchTodosRepository.Params) => Promise<SearchTodosRepository.Result>
}

export namespace SearchTodosRepository {
  export interface Params {
    workspacesId: TodoWorkspacesId
    q: SearchQ
  }
  export interface Result { todos: Todo[] }
}
